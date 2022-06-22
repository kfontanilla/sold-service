const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class GetSoldData {
  [property: string]: any
  constructor({
    bridgeClient,
    responseFormatter,
    GetImportConfig,
    SetListingData,
    logger,
  }: any) {
    this.bridgeClient = bridgeClient
    this.responseFormatter = responseFormatter
    this.getImportConfig = GetImportConfig
    this.setListingData = SetListingData
    this.logger = logger
  }

  async execute(request: any, response: any) {
    const {
      params: { LegacyImportId },
    } = request
    try {
      const importData = await this.getImportConfig.get(LegacyImportId)
      //base on providerType - call the appropriate Interface

      // call bridge client interface to extract data from provider
      const soldData = await this.bridgeClient.getSolds(importData)
      // console.log(soldData['@odata.nextLink'])
      // iterate over soldData
      const processedData = await this.processData({
        importData: importData,
        soldData: soldData,
      })

      return this.responseFormatter.success(response, processedData)
    } catch (error: any) {
      this.logger.error({
        message:
          'EXTRACT_SOLD_DATA_ERROR: Error while fetching sold data from data provider',
        LegacyImportId,
        error,
      })

      const { message } = error

      if (message === INVALID_PATH_PARAMETER_ERROR) {
        return this.responseFormatter.badRequest(response)
      }

      return this.responseFormatter.internalServerError(response)
    }
  }

  async processData(result: any) {
    const { importData, soldData } = result

    // console.log(soldData)
    // console.log(importData)
    for (const key in soldData.value) {
      if (parseInt(key) <= 20) {
        console.log(key)
        const listingData = soldData.value[key]
        listingData.ImportConfigId = importData.Id
        await this.setListingData.set(importData.Id, listingData)
      }
    }
  }
}

export default GetSoldData
