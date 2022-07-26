import { BaseRDSRepository } from './base/BaseRDSRepository'

class ListingMediaRepository extends BaseRDSRepository {
  constructor({ ListingMediaModel }: any) {
    super(ListingMediaModel)
  }
}

module.exports = ListingMediaRepository
