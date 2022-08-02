import { BaseRDSRepository } from './base/BaseRDSRepository'

class LocationDataRepository extends BaseRDSRepository {
  public listUpdateFields = [
    'Latitude',
    'Longitude',
    'UnitNumber',
    'StreetName',
    'StreetNumber',
    'StreetAdditionalInfo',
    'City',
    'CountyOrParish',
    'Township',
    'StateOrProvince',
    'PostalCode',
    'PostalCodePlus4',
    'Country',
    'UnparsedAddress',
    'SchoolGroup',
    'AreaGroup',]

  constructor({ LocationDataModel }: any) {
    super(LocationDataModel)
  }

  async setLocationData(ListingData: any) {
    try {

      const  onDuplicate = {
        updateOnDuplicate: this.listUpdateFields,
      }

      return await this.upsert(ListingData, onDuplicate)
    } catch (error) {
      throw error
    }
  }
}

module.exports = LocationDataRepository
