import { BaseRDSRepository } from './base/BaseRDSRepository'

class LocationDataRepository extends BaseRDSRepository {
  constructor({ LocationDatumModel }: any) {
    super(LocationDatumModel)
  }
}

module.exports = LocationDataRepository
