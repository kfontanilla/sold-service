import { BaseRDSRepository } from './base/BaseRDSRepository'

class LocationDataRepository extends BaseRDSRepository {
  constructor({ LocationDatumModel }: any) {
    super(LocationDatumModel)
  }

  async setLocationData(ListingData: any) {
    try {
      return await this.insertMany(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = LocationDataRepository
