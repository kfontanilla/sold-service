import { BaseRDSRepository } from './base/BaseRDSRepository'

class PropertyDetailRepository extends BaseRDSRepository {
  constructor({ PropertyDetailModel }: any) {
    super(PropertyDetailModel)
  }

  async setPropertyDetail(ListingData: any) {
    try {
      return await this.insertMany(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = PropertyDetailRepository
