import { BaseRDSRepository } from './base/BaseRDSRepository'

class PropertyDataRepository extends BaseRDSRepository {
  public listUpdateFields = [
    'PropertyType',
    'PropertySubType',
    'UniversalPropertyId',
    'UniversalPropertySubId',
    'LotFeatures',
    'LotSizeAcres',
    'LotSizeArea',
    'LotSizeSquareFeet',
    'LotSizeUnits',
    'AccessibilityFeatures',
    'AttachedGarageYN',
    'Basement',
    'BasementYN',
    'BathroomsFull',
    'BathroomsHalf',
    'BathroomsOneQuarter',
    'BathroomsPartial',
    'BathroomsThreeQuarter',
    'BathroomsTotalInteger',
    'BedroomsPossible',
    'BedroomsTotal',
    'ConstructionMaterials',
    'Cooling',
    'CoolingYN',
    'DoorFeatures',
    'ExteriorFeatures',
    'FireplaceFeatures',
    'FireplacesTotal',
    'FireplaceYN',
    'Flooring',
    'GarageSpaces',
    'GarageYN',
    'Heating',
    'HeatingYN',
    'InteriorFeatures',
    'NewConstructionYN',
    'OpenParkingSpaces',
    'OpenParkingYN',
    'ParkingFeatures',
    'ParkingTotal',
    'PropertyAttachedYN',
    'PropertyCondition',
    'Roof',
    'WindowFeatures',
    'YearBuilt',
    'Rooms',
    'RoomsTotal',
    'RoomType',
  ]
  constructor({ PropertyDataModel }: any) {
    super(PropertyDataModel)
  }

  async setPropertyData(ListingData: any) {
    try {
      const onDuplicate = {
        updateOnDuplicate: this.listUpdateFields,
      }
      return await this.insertMany(ListingData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = PropertyDataRepository
