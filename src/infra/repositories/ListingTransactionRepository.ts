import { BaseRDSRepository } from './base/BaseRDSRepository'

class ListingTransactionRepository extends BaseRDSRepository {
  constructor({ ListingTransactionModel }: any) {
    super(ListingTransactionModel)
  }
}

module.exports = ListingTransactionRepository
