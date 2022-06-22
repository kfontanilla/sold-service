import { BaseRDSRepository } from './base/BaseRDSRepository'

class LocationDataRepository extends BaseRDSRepository {
  constructor({ LocationDatumModel }: any) {
    super(LocationDatumModel)
  }

  async setLocationData(ListingData: any) {
    try {
      return await this.save(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = LocationDataRepository
