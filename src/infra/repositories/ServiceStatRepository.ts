import { ServiceDetail } from '../../domain/ServiceDetail';
import { BaseRDSRepository } from './base/BaseRDSRepository'

class ServiceStatRepository extends BaseRDSRepository {
  constructor({ ServiceStatModel }: any) {
    super(ServiceStatModel)
  }
  
  async setServiceStat(ServiceDetail: ServiceDetail) {
    try {
      return await this.save(ServiceDetail)
    } catch (error) {
      throw error
    }
  }
}

module.exports = ServiceStatRepository
