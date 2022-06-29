import { BaseRDSRepository } from './base/BaseRDSRepository'

class ServiceStatRepository extends BaseRDSRepository {
  constructor({ ServiceStatModel }: any) {
    super(ServiceStatModel)
  }
  
  async setServiceStat(ListingData: any) {
    try {
      return await this.save(ListingData)
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ServiceStatRepository
