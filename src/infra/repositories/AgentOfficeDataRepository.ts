import { BaseRDSRepository } from './base/BaseRDSRepository'

class AgentOfficeDataRepository extends BaseRDSRepository {
  constructor({ AgentOfficeDataModel }: any) {
    super(AgentOfficeDataModel)
  }

  async setAgentOfficeData(ListingData: any) {
    try {
      return await this.insertMany(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = AgentOfficeDataRepository
