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
      const ListingDataResult = await this.listingDataRepository.save(
        ListingData
      )
      // check data for error
      ListingData.ListingDataId = ListingDataResult.Id
      // use for saving to Agent Office Data, Listing
      // await this.setAgentOfficeData(ListingData)
      // await this.setListingTransaction(ListingData)
      await this.setLocationData(ListingData)
      const PropertyDataResult = await this.propertyDetailRepository.setPropertyData(ListingData)
      // ListingData.PropertyDataId = PropertyDataResult.Id
      // await this.setPropertyDetail(ListingData)

      return ListingDataResult
    } catch (error) {
      this.logger.error({
        message: 'SET_ListingDataResult_ERROR',
        ImportConfigId,
        error,
      })
    }
  }
}

export default SetListingData
