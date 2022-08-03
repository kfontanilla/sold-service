import e from 'express'
import { exit } from 'process'

class SetListingData {
  [property: string]: any
  constructor({
    agentOfficeDataRepository,
    listingDataRepository,
    listingTransactionRepository,
    locationDataRepository,
    logger,
    propertyDataRepository,
    propertyDetailRepository,
    payloadHelper,
  }: any) {
    this.agentOfficeDataRepository = agentOfficeDataRepository
    this.listingDataRepository = listingDataRepository
    this.listingTransactionRepository = listingTransactionRepository
    this.locationDataRepository = locationDataRepository
    this.logger = logger
    this.propertyDataRepository = propertyDataRepository
    this.propertyDetailRepository = propertyDetailRepository
    this.payloadHelper = payloadHelper
  }

  async set(ImportConfigId: string, ListingData: any) {
    try {
      const processedListingDataGroup =
        await this.payloadHelper.generateSoldsJsonDataTypePayload(ListingData)
      const ListingDataResult = await this.listingDataRepository.setListingData(
        processedListingDataGroup
      )

      const processedListingData = await this.mappedListingDataId(
        ListingDataResult,
        processedListingDataGroup
      )

      await this.agentOfficeDataRepository.setAgentOfficeData(
        processedListingData
      )

      // listing transactions should only update when status changes
      // change this call for any changes to a particular listing ID
      // await this.listingTransactionRepository.setListingTransaction(
      //   processedListingData
      // )
      
      await this.locationDataRepository.setLocationData(processedListingData)
      const PropertyDataResult =
        await this.propertyDataRepository.setPropertyData(processedListingData)

      // mapped insert PropertyData
      const processedPropertyData = await this.mappedPropertyDataId(
        PropertyDataResult,
        processedListingData
      )

      await this.propertyDetailRepository.setPropertyDetail(
        processedPropertyData
      )

      this.logger.info({
        message: 'SET_ListingDataResult_SUCCESS',
        ImportConfigId,
        ListingInserted: ListingDataResult.length,
      })

      return ListingDataResult
    } catch (error: any) {
      const errDetails = {
        errorName: error.name,
        errorSqlMessage: error.parent.sqlMessage,
        errorCode: error.parent.code,
      }
      this.logger.error({
        message: 'SET_ListingDataResult_ERROR',
        ImportConfigId,
        errDetails,
      })
    }
  }

  /**
   * Mapped the ListingDataId to the Raw ListingData from the Provider
   * @param  {Array{}} ListingDataResult
   * @param  {Array{}} ListingData
   *
   * @returns {Object} Will return the mapped listing data id.
   */
  async mappedListingDataId(ListingDataResult: any, ListingData: any): Promise<object> {
    return await Promise.all(
      ListingData.map(async (item: any) => {
        const found = ListingDataResult.find(
          (row: any) => item.ListingKey === row.ListingKey
        )
        item.ListingDataId = found.Id
        if (item.ListingDataId == null) {
          // if Duplicate
          const record = await this.listingDataRepository.getOne({
            where: { ListingKey: item.ListingKey },
          })
          item.ListingDataId = record.Id
        }
        return item
      })
    )
  }

  /**
   * Mapped the ListingDataId to the Raw ListingData from the Provider
   * @param  {Array{}} ListingDataResult
   * @param  {Array{}} ListingData
   *
   * @returns {Object} Will return the mapped listing data id.
   */
  async mappedPropertyDataId(ListingDataResult: any, ListingData: any): Promise<object> {
    return await Promise.all(
      ListingData.map(async (item: any) => {
        const found = ListingDataResult.find(
          (row: any) => item.ListingKey === row.ListingKey
        )
        item.PropertyDataId = found.Id
        if (item.PropertyDataId == null) {
          // if Duplicate
          const record = await this.propertyDataRepository.getOne({
            where: { ListingKey: item.ListingKey },
          })
          item.PropertyDataId = record.Id
        }

        return item
      })
    )
  }
}

export default SetListingData
