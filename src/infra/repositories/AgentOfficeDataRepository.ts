import { BaseRDSRepository } from './base/BaseRDSRepository'

class AgentOfficeDataRepository extends BaseRDSRepository {
  constructor({ AgentOfficeDatumModel }: any) {
    super(AgentOfficeDatumModel)
  }
}

module.exports = AgentOfficeDataRepository
