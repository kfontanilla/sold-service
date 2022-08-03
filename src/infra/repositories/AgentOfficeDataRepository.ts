import { BaseRDSRepository } from './base/BaseRDSRepository'

class AgentOfficeDataRepository extends BaseRDSRepository {
  public listUpdateFields = [
    'BuyerAgentKey',
    'BuyerAgentMlsId',
    'BuyerAgentFullName',
    'BuyerOfficeKey',
    'BuyerOfficeMlsId',
    'BuyerOfficeName',
    'CoBuyerAgentKey',
    'CoBuyerAgentMlsId',
    'CoBuyerAgentFullName',
    'CoBuyerOfficeKey',
    'CoBuyerOfficeName',
    'ListAgentKey',
    'ListAgentMlsId',
    'ListAgentFullName',
    'ListOfficeKey',
    'ListOfficeMlsId',
    'ListOfficeName',
    'CoListAgentKey',
    'CoListAgentMlsId',
    'CoListAgentFullName',
    'CoListOfficeKey',
    'CoListOfficeMlsId',
    'CoListOfficeName',
  ]
  constructor({ AgentOfficeDataModel }: any) {
    super(AgentOfficeDataModel)
  }

  async setAgentOfficeData(ListingData: any) {
    try {

      const onDuplicate = {
        updateOnDuplicate: this.listUpdateFields,
      }
      return await this.upsertMany(ListingData, onDuplicate)

    } catch (error) {
      throw error
    }
  }
}

module.exports = AgentOfficeDataRepository
