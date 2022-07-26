import { BaseRDSRepository } from './base/BaseRDSRepository'

class PropertyDataRepository extends BaseRDSRepository {
  constructor({ PropertyDataModel }: any) {
    super(PropertyDataModel)
  }

  async setPropertyData(ListingData: any) {
    try {
      return await this.insertMany(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = PropertyDataRepository
