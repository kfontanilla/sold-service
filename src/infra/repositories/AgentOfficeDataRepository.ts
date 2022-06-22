import { BaseRDSRepository } from './base/BaseRDSRepository'

class AgentOfficeDataRepository extends BaseRDSRepository {
  constructor({ AgentOfficeDatumModel }: any) {
    super(AgentOfficeDatumModel)
  }

  async setAgentOfficeData(ListingData: any) {
    try {
      return await this.save(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = AgentOfficeDataRepository
