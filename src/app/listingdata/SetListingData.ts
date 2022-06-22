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
  }: any) {
    this.agentOfficeDataRepository = agentOfficeDataRepository
    this.listingDataRepository = listingDataRepository
    this.listingTransactionRepository = listingTransactionRepository
    this.locationDataRepository = locationDataRepository
    this.logger = logger
    this.propertyDataRepository = propertyDataRepository
    this.propertyDetailRepository = propertyDetailRepository
  }

  async set(ImportConfigId: string, ListingData: any) {
    try {
      const ListingDataResult = await this.listingDataRepository.insertMany(
        ListingData
      )

      const processedListingData = await this.mappedListingDataId(
        ListingDataResult,
        ListingData
      )

      await this.agentOfficeDataRepository.setAgentOfficeData(
        processedListingData
      )
      await this.listingTransactionRepository.setListingTransaction(
        processedListingData
      )
      await this.locationDataRepository.setLocationData(processedListingData)
      await this.propertyDataRepository.setPropertyData(processedListingData)

      // this.logger.info({
      //   message: 'SET_ListingDataResult_SUCCESS',
      //   ImportConfigId,
      //   processedListingData,
      // })
      return ListingDataResult
    } catch (error) {
      this.logger.error({
        message: 'SET_ListingDataResult_ERROR',
        ImportConfigId,
        error,
      })
    }
  }

  /**
   * Mapped the ListingDataId to the Raw ListingData from the Provider
   * @param ListingDataResult
   * @param ListingData
   * @returns processedData
   */
  async mappedListingDataId(ListingDataResult: any, ListingData: any) {
    const data = ListingData.map((item: any) => {
      const found = ListingDataResult.find(
        (row: any) => item.ListingKey == row.ListingKey
      )
      item.ListingDataId = found.Id
      return item
    })

    return data
  }
}

export default SetListingData
