import e from 'express'
import { ImportConfig } from '../../domain/ImportConfig'
import { ServiceDetail } from '../../domain/ServiceDetail'

const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class GetSoldData {
  [property: string]: any
  constructor({
    webAPIClient,
    responseFormatter,
    importConfigRepository,
    SetListingData,
    logger,
    serviceStatRepository,
  }: any) {
    this.webAPIClient = webAPIClient
    this.responseFormatter = responseFormatter
    this.importConfigRepository = importConfigRepository
    this.setListingData = SetListingData
    this.logger = logger
    this.serviceStatRepository = serviceStatRepository
  }

  async execute(request: any, response: any) {
    const {
      params: { LegacyImportId },
    } = request
    try {
      const importConfigData =
        await this.importConfigRepository.getByLegacyImportId(LegacyImportId)

      // Base on providerType - call the appropriate Interface
      // For MLSGrid, you need to include the ModificationTimestamp on your next link just incase of errors during import
      let serviceStatsData =
        await this.serviceStatRepository.getLatestServiceStats(importConfigData)

      const newImportConfigData = this.modifyImportConfigData(
        importConfigData,
        serviceStatsData
      )
      if (!serviceStatsData) {
        serviceStatsData = await this.updateServiceStat(newImportConfigData)
      }

      newImportConfigData.AvailableListingCount =
        serviceStatsData.AvailableListingCount

      // process data
      this.apiCall( newImportConfigData )
      // display current status of sold service run
      return this.responseFormatter.success(response, serviceStatsData)
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
      let currentImportCount =
        typeof importData.ImportedListingCount !== 'undefined'
          ? importData.ImportedListingCount
          : 0
      let finished = false
      let queryUrl = ''
      let modificationTimestamp = ''
      // call provider interface to extract data from provider
      do {

        console.log(importData)
        let soldData = await this.webAPIClient.getSolds(importData)
        // delay base on provider

        this.logger.info({
          message: 'GET_SOLD_DATA_API_CALL',
          currentImportCount,
          finished,
        })
        await this.delay()
        queryUrl = soldData['@odata.nextLink']
        if (typeof soldData.value[soldData.value.length - 1] !== 'undefined') {
          modificationTimestamp =
            soldData.value[soldData.value.length - 1].ModificationTimestamp
        }
        finished = typeof queryUrl === 'undefined'
        importData.nextLink = !finished ? queryUrl : importData.nextLink
        // iterate over soldData
        const processedData = await this.processData({
          importData: importData,
          soldData: soldData,
        })

        currentImportCount += soldData.value.length

        importData.serviceDetail = {
          ImportConfigId: importData.Id,
          AvailableListingCount: importData.AvailableListingCount,
          ImportedListingCount: currentImportCount,
          ImageDownLoaded: 0,
          ServiceDetails: {
            startLink: importData.nextLink,
            nextLink: queryUrl,
            modificationTimestamp: modificationTimestamp,
          },
        }

        this.logger.info({
          message: 'GET_SOLD_DATA_COUNTER',
          currentImportCount,
          finished,
        })

        await this.updateServiceStat(importData)
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
            modificationTimestamp: modificationTimestamp,
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
        error,
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
    let serviceDetailData = importData.serviceDetail

    try {
      if (typeof serviceDetailData === 'undefined') {
        const soldDataServiceStats = await this.webAPIClient.getSolds(
          importData
        )

        await this.delay()
        serviceDetailData = {
          ImportConfigId: importData.Id,
          AvailableListingCount: soldDataServiceStats['@odata.count'],
          ImageDownLoaded: 0,
          ServiceDetails: {
            startLink: importData.nextLink,
            nextLink: soldDataServiceStats['@odata.nextLink'],
          },
        }
      }

      await this.serviceStatRepository.setServiceStat(serviceDetailData)
    } catch (error: any) {
      const errMessage = error.name
      this.logger.error({
        message: 'updateServiceStat_ERROR',
        importData,
        errMessage,
      })
    }

    return serviceDetailData
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

  modifyImportConfigData(
    importConfigData: any = {},
    serviceStatsData: any = {}
  ): ImportConfig {
    let {
      ModificationTimestamp: importConfigModificationTimestamp,
      nextLink: importConfigNextLink,
      ImportedListingCount: importConfigImportedListingCount,
    } = importConfigData

    let {
      ServiceDetails: {
        modificationTimestamp: serviceStatsMofificationTimestamp,
        nextLink: serviceStatsNextLink,
      },
      ImportedListingCount: serviceStatsImportedListingCount,
    } = serviceStatsData

    importConfigNextLink = this.webAPIClient.buildQueryUrl(importConfigData)

    // Base on providerType - call the appropriate Interface
    // For MLSGrid, you need to include the ModificationTimestamp on your next link just incase of errors during import
    if (serviceStatsData) {
      if (serviceStatsMofificationTimestamp !== 'undefined') {
        importConfigModificationTimestamp = serviceStatsMofificationTimestamp
      }

      if (typeof serviceStatsNextLink !== 'undefined') {
        importConfigNextLink = serviceStatsNextLink
      }

      importConfigImportedListingCount = serviceStatsImportedListingCount
      importConfigData.serviceDetail = serviceStatsData
      importConfigData.ModificationTimestamp = importConfigModificationTimestamp
      
    }
    importConfigData.ImportedListingCount = importConfigImportedListingCount
    importConfigData.nextLink = importConfigNextLink

    return importConfigData
  }
}

export default GetSoldData
