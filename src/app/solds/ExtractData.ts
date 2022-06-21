const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class ExtractData {
  private readonly bridgeClient
  private readonly responseFormatter
  private readonly getImportConfig
  private readonly setListingData
  private readonly logger
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
      const listData = soldData.value[0]
      const ImportConfigId = importData.Id
      listData.ImportConfigId = ImportConfigId
      const listingData = await this.setListingData.set(
        ImportConfigId,
        listData
      )

      return this.responseFormatter.success(response, soldData)
    } catch (error: any) {

      this.logger.error({
        message: 'Error while fetching sold data from data provider',
        LegacyImportId,
        error,
      })

      console.log('GET_SOLD_DATA_ERROR', error)
      const { message } = error

      if (message === INVALID_PATH_PARAMETER_ERROR) {
        return this.responseFormatter.badRequest(response)
      }

      return this.responseFormatter.internalServerError(response)
    }
  }
}

export default ExtractData
