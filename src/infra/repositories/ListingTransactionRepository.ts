import { BaseRDSRepository } from './base/BaseRDSRepository'

class ListingTransactionRepository extends BaseRDSRepository {
  constructor({ ListingTransactionModel }: any) {
    super(ListingTransactionModel)
  }

  async setListingTransaction(ListingData: any) {
    try {
      return await this.save(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = ListingTransactionRepository
