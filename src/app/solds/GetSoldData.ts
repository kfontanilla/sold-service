import e from 'express'
import { ImportConfig } from '../../domain/ImportConfig'
import { ServiceDetail } from '../../domain/ServiceDetail'
const url = require('url')

const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class GetSoldData {
  [property: string]: any
  constructor({
    webAPIClient,
    responseFormatter,
    importConfigRepository,
    SetListingData,
    SetListingMedia,
    logger,
    serviceStatRepository,
    listingDataRepository,
  }: any) {
    this.webAPIClient = webAPIClient
    this.listingDataRepository = listingDataRepository
    this.responseFormatter = responseFormatter
    this.importConfigRepository = importConfigRepository
    this.setListingData = SetListingData
    this.setListingMedia = SetListingMedia
    this.logger = logger
    this.serviceStatRepository = serviceStatRepository
  }

  async execute(request: any, response: any) {
    const {
      params: { ImportId },
    } = request

    try {
      const importConfigData = await this.importConfigRepository.getById(
        ImportId
      )
      const requestUrl = url.parse(request.url, true)
      // can be extractfull | extractincremental
      importConfigData.extractionType = this.checkExtraction(
        requestUrl.pathname
      )
      let serviceStatsData =
        await this.serviceStatRepository.getLatestServiceStats(importConfigData)

      if (
        typeof requestUrl.query.fullscan !== 'undefined' &&
        requestUrl.query.fullscan == 'true' && importConfigData.extractionType === 'extractfull'
      ) {
        serviceStatsData = null
      }
      // Base on providerType - call the appropriate Interface
      // For MLSGrid, you need to include the ModificationTimestamp on your next link just incase of errors during import

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
      this.apiCall(newImportConfigData)
      // display current status of sold service run
      return this.responseFormatter.success(response, serviceStatsData)
    } catch (error: any) {
      const { message } = error

      this.logger.error({
        message:
          'GET_SOLD_DATA_ERROR: Error while fetching sold data from data provider',
        ImportId,
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
        let soldData = await this.webAPIClient.getSolds(importData)
        // delay base on provider

        this.logger.info({
          message: 'GET_SOLD_DATA_API_CALL',
          currentImportCount,
          finished,
        })
        await this.delay()
        queryUrl = soldData['@odata.nextLink']

        finished = typeof queryUrl === 'undefined'
        importData.nextLink = !finished ? queryUrl : importData.nextLink
        queryUrl = !finished ? queryUrl : importData.nextLink

        // process if there is data found
        if (typeof soldData.value[soldData.value.length - 1] !== 'undefined') {
          modificationTimestamp =
            soldData.value[soldData.value.length - 1].ModificationTimestamp

          // iterate over soldData
          const processedData = await this.processData({
            importData: importData,
            soldData: soldData,
          })
          currentImportCount = soldData.value.length

          if (importData.extractionType === 'extractincremental') {
            importData.serviceDetail = {
              ImportConfigId: importData.Id,
              AvailableListingCount: importData.AvailableListingCount,
              ImportedListingCount: currentImportCount,
              ImageDownLoaded: 0,
              ServiceDetails: {
                extractfull: importData.serviceDetail.ServiceDetails.extractfull,
                extractincremental: {
                  startLink: importData.nextLink,
                  nextLink: queryUrl,
                },
                modificationTimestamp: modificationTimestamp,
              },
            }
          } else {
            importData.serviceDetail = {
              ImportConfigId: importData.Id,
              AvailableListingCount: importData.AvailableListingCount,
              ImportedListingCount: currentImportCount,
              ImageDownLoaded: 0,
              ServiceDetails: {
                extractfull: {
                  startLink: importData.nextLink,
                  nextLink: queryUrl,
                },
                modificationTimestamp: modificationTimestamp,
              },
            }
          }

          this.logger.info({
            message: 'GET_SOLD_DATA_COUNTER',
            currentImportCount,
            finished,
          })

          await this.updateServiceStat(importData)
        }
      } while (!finished)

      if (finished) {
        // update service stats
        // query listing_table & request again to provider to update final count
        const AvailableListingCount = await this.listingDataRepository.getListingCount(importData)

        if (importData.extractionType === 'extractincremental') {
          importData.serviceDetail = {
            ImportConfigId: importData.Id,
            AvailableListingCount: importData.AvailableListingCount,
            ImportedListingCount: AvailableListingCount,
            ImageDownLoaded: 0,
            LastSuccessfulRun: new Date(),
            ServiceDetails: {
              extractfull: importData.serviceDetail.ServiceDetails.extractfull,
              extractincremental: {
                nextLink: importData.nextLink,
              },
              modificationTimestamp:
                modificationTimestamp !== ''
                  ? modificationTimestamp
                  : importData.serviceDetail.ServiceDetails
                      .modificationTimestamp,
            },
          }
        } else {
          importData.serviceDetail = {
            ImportConfigId: importData.Id,
            AvailableListingCount:  importData.AvailableListingCount,
            ImportedListingCount: AvailableListingCount,
            ImageDownLoaded: 0,
            LastSuccessfulRun: new Date(),
            ServiceDetails: {
              extractfull: {
                nextLink: importData.nextLink,
              },
              modificationTimestamp:
                modificationTimestamp !== ''
                  ? modificationTimestamp
                  : importData.serviceDetail.ServiceDetails.modificationTimestamp,
            },
          }
        }

        await this.updateServiceStat(importData)

        this.logger.info({
          message: 'GET_SOLD_DATA_DONE',
          AvailableListingCount,
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
    // const preProcessedMediaData = []

    for (const key in soldData.value) {
      const listingData = soldData.value[key]
      listingData.ImportConfigId = importData.Id
      // removed downloading of Media
      // if (listingData.Media) {
      //   const listingMediaData = listingData.Media.map((item: any) => {
      //     item.ListingKey = listingData.ListingKey
      //     return item
      //   })
      //   preProcessedMediaData.push(listingMediaData)
      // }
      preProcessedData.push(listingData)
    }

    const listingCount = await this.setListingData.set(
      importData.Id,
      preProcessedData
    )
    // const mediaCount = await this.setListingMedia.set(
    //   importData.Id,
    //   preProcessedMediaData
    // )
    return listingCount
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
        // missing implementation check if total count is updated
        await this.delay()
        serviceDetailData = {
          ImportConfigId: importData.Id,
          AvailableListingCount: soldDataServiceStats['@odata.count'],
          ImageDownLoaded: 0,
          ServiceDetails: {
            extractfull: {
              startLink: importData.nextLink,
              nextLink: soldDataServiceStats['@odata.nextLink'],
            }
          },
        }
        if(importData.extractionType === 'extractincremental'){
          serviceDetailData = {
            ImportConfigId: importData.Id,
            AvailableListingCount: soldDataServiceStats['@odata.count'],
            ImageDownLoaded: 0,
            ServiceDetails: {
              extractincremental: {
                startLink: importData.nextLink,
                nextLink: soldDataServiceStats['@odata.nextLink'],
              }
            },
          }
        }
      }
      serviceDetailData = await this.serviceStatRepository.setServiceStat(serviceDetailData)
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

    importConfigNextLink = this.webAPIClient.buildQueryUrl(importConfigData)

    // Base on providerType - call the appropriate Interface
    // For MLSGrid, you need to include the ModificationTimestamp on your next link just incase of errors during import
    if (serviceStatsData) {
      let {
        ServiceDetails: {
          modificationTimestamp: serviceStatsMofificationTimestamp,
       
        },
        ImportedListingCount: serviceStatsImportedListingCount,
      } = serviceStatsData
      //set last mod
      if (serviceStatsMofificationTimestamp !== 'undefined') {
        importConfigModificationTimestamp = serviceStatsMofificationTimestamp
      }
      importConfigData.ModificationTimestamp = importConfigModificationTimestamp

      let serviceStatsNextLink = (serviceStatsData.ServiceDetails.extractfull ? serviceStatsData.ServiceDetails.extractfull.nextLink : undefined)

      if(importConfigData.extractionType === 'extractincremental'){
        serviceStatsNextLink = this.webAPIClient.buildQueryUrl(importConfigData)
        if(typeof serviceStatsData.ServiceDetails.extractincremental !== 'undefined'){
          serviceStatsNextLink = serviceStatsData.ServiceDetails.extractincremental.nextLink
        }
      }

      if (typeof serviceStatsNextLink !== 'undefined') {
        importConfigNextLink = serviceStatsNextLink
      }

      importConfigImportedListingCount = serviceStatsImportedListingCount
      importConfigData.serviceDetail = serviceStatsData
    
    }
    importConfigData.ImportedListingCount = importConfigImportedListingCount
    importConfigData.nextLink = importConfigNextLink

    return importConfigData
  }

  checkExtraction(path: string) {
    return path.split('/')[2]
  }
}

export default GetSoldData
