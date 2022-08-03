import { BaseRDSRepository } from './base/BaseRDSRepository'

class PropertyDetailRepository extends BaseRDSRepository {
  public listUpdateFields = [
  'BusinessGroup',
  'CharacteristicGroup',
  'EquipmentGroup',
  'FarmingGroup',
  'FinancialGroup',
  'HOAGroup',
  'OccupantOwnerGroup',
  'StructureGroup',
  'TaxGroup',
  'UtilitiesGroup',]

  constructor({ PropertyDetailModel }: any) {
    super(PropertyDetailModel)
  }

  async setPropertyDetail(ListingData: any) {
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

module.exports = PropertyDetailRepository
