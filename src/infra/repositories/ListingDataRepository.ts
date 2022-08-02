import { BaseRDSRepository } from './base/BaseRDSRepository'

class ListingDataRepository extends BaseRDSRepository {
  public listUpdateFields = [
    'DisplayAsSold',
    'ListingKeyNumeric',
    'ListingId',
    'StandardStatus',
    'MlsStatus',
    'ListingService',
    'ListingAgreement',
    'ListAOR',
    'LeaseConsideredYN',
    'HomeWarrantyYN',
    'ClosePrice',
    'ListPrice',
    'OriginalListPrice',
    'PreviousListPrice',
    'DaysOnMarket',
    'CloseDate',
    'OriginatingSystemID',
    'OriginatingSystemKey',
    'OriginatingSystemName',
    'SourceSystemID',
    'SourceSystemKey',
    'SourceSystemName',
    'ModificationTimestamp',
    'OriginalEntryTimestamp',
    'PhotosChangeTimestamp',
    'DatesGroup',
    'ClosingGroup',
    'CompensationGroup',
    'MediaGroup',
    'ShowingGroup',
    'RemarksGroup',]
  constructor({ ListingDataModel }: any) {
    super(ListingDataModel)
  }

  async setListingData(ListingData: any) {
    try {
      const onDuplicate = {
        updateOnDuplicate: this.listUpdateFields,
      }
      return await this.upsert(ListingData, onDuplicate)
    } catch (error) {
      throw error
    }
  }
}

module.exports = ListingDataRepository
