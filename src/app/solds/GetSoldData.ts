import { ImportConfig } from '../../domain/ImportConfig'
import { ServiceDetail } from '../../domain/ServiceDetail'

const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class GetSoldData {
  [property: string]: any
  constructor({
    bridgeClient,
    responseFormatter,
    GetImportConfig,
    SetListingData,
    logger,
    serviceStatRepository,
  }: any) {
    this.bridgeClient = bridgeClient
    this.responseFormatter = responseFormatter
    this.getImportConfig = GetImportConfig
    this.setListingData = SetListingData
    this.logger = logger
    this.serviceStatRepository = serviceStatRepository
  }

  async execute(request: any, response: any) {
    const {
      params: { LegacyImportId },
    } = request
    try {
      const importData = await this.getImportConfig.get(LegacyImportId)
      // Base on providerType - call the appropriate Interface
      importData.nextLink = this.bridgeClient.buildQueryUrl(importData)

      const serviceStats = await this.updateServiceStat(importData)
      importData.AvailableListingCount = serviceStats.AvailableListingCount
      // process data
      this.apiCall(importData)
      // display current status of sold service run
      return this.responseFormatter.success(response, serviceStats)
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

  /**
   * Api call to provider then traversing all the data
   *
   * @param  {ImportConfig} importData
   *
   * @returns no returns
   */

  async apiCall(importData: ImportConfig) {
    try {
      let currentImportCount = 0
      let finished = false
      let queryUrl = ''
      // call provider interface to extract data from provider
      do {
        let soldData = await this.bridgeClient.getSolds(importData)
        // delay base on provider
        await this.delay()
        queryUrl = soldData['@odata.nextLink']
        currentImportCount += soldData.value.length

        importData.serviceDetail = {
          ImportConfigId: importData.Id,
          AvailableListingCount: importData.AvailableListingCount,
          ImportedListingCount: currentImportCount,
          ImageDownLoaded: 0,
          ServiceDetails: {
            startLink: importData.nextLink,
            nextLink: queryUrl,
          },
        }
        await this.updateServiceStat(importData)

        finished = typeof queryUrl === 'undefined'
        importData.nextLink = !finished ? queryUrl : importData.nextLink

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
      } while (!finished)

      if (finished) {
        // update service stats
        importData.serviceDetail = {
          ImportConfigId: importData.Id,
          AvailableListingCount: importData.AvailableListingCount,
          ImportedListingCount: currentImportCount,
          ImageDownLoaded: 0,
          LastSuccessfulRun: new Date(),
          ServiceDetails: {
            nextLink: importData.nextLink,
          },
        }

        await this.updateServiceStat(importData)

        this.logger.info({
          message: 'GET_SOLD_DATA_DONE',
          currentImportCount,
          finished,
        })
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

  /**
   * Update service stats on every run
   *
   * @param  {ImportConfig} importData
   *
   * @returns {ServiceDetail} serviceDetail
   */

  async updateServiceStat(importData: ImportConfig): Promise<ServiceDetail> {

    let serviceDetail = importData.serviceDetail

    try {
      if (typeof importData.serviceDetail === 'undefined') {
        const serviceStats = await this.bridgeClient.getSolds(importData)
        await this.delay()
        serviceDetail = {
          ImportConfigId: importData.Id,
          AvailableListingCount: serviceStats['@odata.count'],
          ImageDownLoaded: 0,
          ServiceDetails: {
            startLink: importData.nextLink,
            nextLink: serviceStats['@odata.nextLink'],
          },
        }
      }

      await this.serviceStatRepository.setServiceStat(serviceDetail)

    
    } catch (error: any) {
      const errMessage = error.name
      this.logger.error({
        message: 'updateServiceStat_ERROR',
        importData,
        errMessage,
      })
    }

    return serviceDetail
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
