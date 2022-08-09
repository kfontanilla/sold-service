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
    'PhotosCount',
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
      return await this.upsertMany(ListingData, onDuplicate)
    } catch (error) {
      throw error
    }
  }

  async getListingCount(ImportConfig: any){
    try {
      const options = {
        where: { ImportConfigId: ImportConfig.Id },
      }
      return await this.getCount(options)
    } catch (error) {
      throw error
    }
  }
}

module.exports = ListingDataRepository
