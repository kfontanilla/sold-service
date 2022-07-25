import { exit } from "process"

class SetListingMedia {
  [property: string]: any
  constructor({
    listingDataRepository,
    logger,
  }: any) {
    this.listingDataRepository = listingDataRepository
    this.logger = logger
  }

  async set(ImportConfigId: string, ListingData: any) {
    try {
      
      await this.propertyDetailRepository.setPropertyDetail(processedPropertyData)
  
      // this.logger.info({
      //   message: 'SET_ListingDataResult_SUCCESS',
      //   ImportConfigId,
      //   processedListingData,
      // })
    //   return ListingDataResult
    } catch (error: any) {
      const errDetails = {
        errorName: error.name,
        errorSqlMessage: error.parent.sqlMessage,
        errorCode: error.parent.code,
      }
      this.logger.error({
        message: 'SET_ListingMediaResult_ERROR',
        ImportConfigId,
        errDetails,
      })
    }
  }
}

export default SetListingMedia
