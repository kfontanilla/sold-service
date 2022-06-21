class SetAgentOfficeData {
  agentOfficeDataRepository: any
  private readonly logger

  constructor({ agentOfficeDataRepository, logger }: any) {
    this.agentOfficeDataRepository = agentOfficeDataRepository
    this.logger = logger
  }

  async set(ListingDataId: string, ListingData: any) {
    try {
      const data = await this.agentOfficeDataRepository.save(ListingData)
      // check data for error
      return data
    } catch (error) {
      this.logger.error({
        message: 'SET_LISTING_DATA_ERROR',
        ListingDataId,
        error,
      })
    }
  }
}

export default SetAgentOfficeData
