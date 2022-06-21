import { BaseRDSRepository } from './base/BaseRDSRepository';

class ListingDataRepository extends BaseRDSRepository {
  constructor({ ListingDatumModel }: any) {
    super(ListingDatumModel);
  }
}

module.exports = ListingDataRepository;
