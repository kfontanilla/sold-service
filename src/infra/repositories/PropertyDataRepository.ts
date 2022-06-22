import { BaseRDSRepository } from './base/BaseRDSRepository'

class PropertyDataRepository extends BaseRDSRepository {
  constructor({ PropertyDatumModel }: any) {
    super(PropertyDatumModel)
  }

  async setPropertyData(ListingData: any) {
    try {
      return await this.save(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = PropertyDataRepository
