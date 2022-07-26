import { BaseRDSRepository } from './base/BaseRDSRepository'

class ListingMediaRepository extends BaseRDSRepository {
  constructor({ ListingMediumModel }: any) {
    super(ListingMediumModel)
  }
}

module.exports = ListingMediaRepository
