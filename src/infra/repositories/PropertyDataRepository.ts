import { BaseRDSRepository } from './base/BaseRDSRepository'

class PropertyDataRepository extends BaseRDSRepository {
  constructor({ PropertyDatumModel }: any) {
    super(PropertyDatumModel)
  }
}

module.exports = PropertyDataRepository
