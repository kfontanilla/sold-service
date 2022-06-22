import { BaseRDSRepository } from './base/BaseRDSRepository'

class PropertyDetailRepository extends BaseRDSRepository {
  constructor({ PropertyDetailModel }: any) {
    super(PropertyDetailModel)
  }
}

module.exports = PropertyDetailRepository
