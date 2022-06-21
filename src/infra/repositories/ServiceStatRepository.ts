import { BaseRDSRepository } from './base/BaseRDSRepository'

class ServiceStatRepository extends BaseRDSRepository {
  constructor({ ServiceStatModel }: any) {
    super(ServiceStatModel)
  }
}

module.exports = ServiceStatRepository
