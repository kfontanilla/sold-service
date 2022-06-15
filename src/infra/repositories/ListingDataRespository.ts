const ListingData = require('src/domain/ListingData');
import { BaseRDSRepository } from './base/BaseRDSRepository';

class ListingDataRepository extends BaseRDSRepository {
  constructor({ ListingDataModel }: any) {
    super(ListingDataModel, ListingData);
  }
}

module.exports = ListingDataRepository;
