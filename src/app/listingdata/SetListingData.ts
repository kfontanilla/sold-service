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
      const PropertyDataResult = await this.setPropertyData(ListingData)
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

  async setAgentOfficeData(ListingData: any) {
    const ListingId = ListingData.Id
    try {
      const AgentOfficeResult = await this.agentOfficeDataRepository.save(
        ListingData
      )
      // this.logger.info({
      //   message: 'SET_AgentOfficeResult_SUCCESS',
      //   ListingId,
      //   AgentOfficeResult,
      // })
      return AgentOfficeResult
    } catch (error) {
      this.logger.error({
        message: 'SET_AgentOfficeResult_ERROR',
        ListingId,
        error,
      })
    }
  }

  async setListingTransaction(ListingData: any) {
    const ListingId = ListingData.Id
    try {
      const ListingTransactionResult =
        await this.listingTransactionRepository.save(ListingData)
      // this.logger.info({
      //   message: 'SET_ListingTransactionResult_SUCCESS',
      //   ListingId,
      //   ListingTransactionResult,
      // })
      return ListingTransactionResult
    } catch (error) {
      this.logger.error({
        message: 'SET_ListingTransactionResult_ERROR',
        ListingId,
        error,
      })
    }
  }

  async setLocationData(ListingData: any) {
    const ListingId = ListingData.Id
    try {
      const LocationDataResult = await this.locationDataRepository.save(
        ListingData
      )
      // this.logger.info({
      //   message: 'SET_LocationDataResult_SUCCESS',
      //   ListingId,
      //   LocationDataResult,
      // })
      return LocationDataResult
    } catch (error) {
      this.logger.error({
        message: 'SET_LocationDataResult_ERROR',
        ListingId,
        error,
      })
    }
  }

  async setPropertyData(ListingData: any) {
    const ListingId = ListingData.Id
    try {
      const PropertyDataResult = await this.propertyDataRepository.save(
        ListingData
      )
      // this.logger.info({
      //   message: 'SET_PropertyDataResult_SUCCESS',
      //   ListingId,
      //   PropertyDataResult,
      // })
      return PropertyDataResult
    } catch (error) {
      this.logger.error({
        message: 'SET_PropertyDataResult_ERROR',
        ListingId,
        error,
      })
    }
  }

  async setPropertyDetail(ListingData: any) {
    const ListingId = ListingData.Id
    try {
      const PropertyDetailResult = await this.propertyDetailRepository.save(
        ListingData
      )
      // this.logger.info({
      //   message: 'SET_PropertyDetailResult_SUCCESS',
      //   ListingId,
      //   PropertyDetailResult,
      // })
      return PropertyDetailResult
    } catch (error) {
      this.logger.error({
        message: 'SET_PropertyDetailResult_ERROR',
        ListingId,
        error,
      })
    }
  }
}

export default SetListingData
