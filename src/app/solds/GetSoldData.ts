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
      importData.nextLink = this.bridgeClient.buildQueryUrl(importData)
      const result = await this.apiCall(importData)


      return this.responseFormatter.success(response, result)
    } catch (error: any) {
      const { message } = error

      this.logger.error({
        message:
          'GET_SOLD_DATA_ERROR: Error while fetching sold data from data provider',
        LegacyImportId,
        error,
      })

      if (message === INVALID_PATH_PARAMETER_ERROR) {
        return this.responseFormatter.badRequest(response)
      }

      return this.responseFormatter.internalServerError(response)
    }
  }

  async apiCall(importData: any) {
    try {
      let currentImportCount = 0
      let finished = false
      let queryUrl = ''
      // call provider interface to extract data from provider
      do {
   
        let soldData = await this.bridgeClient.getSolds(importData)
        queryUrl = soldData['@odata.nextLink']
        finished = typeof queryUrl === 'undefined'
        importData.nextLink = queryUrl
        currentImportCount += soldData.value.length

        this.logger.info({
          message: 'GET_SOLD_DATA_COUNTER',
          currentImportCount,
          finished,
        })
        // iterate over soldData
        const processedData = await this.processData({
          importData: importData,
          soldData: soldData,
        })

        await this.delay()
      } while (!finished) 

      if (finished){
        return true
      }

    } catch (error) {
      this.logger.error({
        message:
          'API_CALL_SOLD_DATA_ERROR: Error while fetching sold data from data provider',
        // error,
      })
    }
  }

  async processData(result: any) {
    const { importData, soldData } = result
    const preProcessedData = []

    for (const key in soldData.value) {
      const listingData = soldData.value[key]
      listingData.ImportConfigId = importData.Id
      preProcessedData.push(listingData)
    }
    await this.setListingData.set(importData.Id, preProcessedData)
  }

  async delay() {
    const period = 500
    if (period > 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(period)
        }, period)
      })
    }
    return Promise.resolve(0)
  }
}

export default GetSoldData
