class SetListingData {
  listingDataRepository: any
  private readonly logger
  constructor({ listingDataRepository, logger }: any) {
    this.listingDataRepository = listingDataRepository
    this.logger = logger
  }

  async set(ImportConfigId: string, ListingData: any) {
    try {
      const data = await this.listingDataRepository.save(ListingData)
      // check data for error

      return data
    } catch (error) {
      this.logger.error({
        message: 'SET_LISTING_DATA_ERROR',
        ImportConfigId,
        error,
      })

    }
  }
}

export default SetListingData
