import { BaseRDSRepository } from './base/BaseRDSRepository'

class ListingDataRepository extends BaseRDSRepository {
  constructor({ ListingDataModel }: any) {
    super(ListingDataModel)
  }
}

module.exports = ListingDataRepository
