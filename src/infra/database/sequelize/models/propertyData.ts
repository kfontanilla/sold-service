import { Model } from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class PropertyData extends Model {}
  PropertyData.init(
    {
      Id: {
        type: DataTypes.BIGINT,
        field: 'Id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ListingDataId: {
        type: DataTypes.BIGINT,
        field: 'ListingDataId',
        allowNull: false,
      },
      ListingKey: {
        type: DataTypes.STRING(128),
        field: 'ListingKey',
        allowNull: false,
      },
      PropertyType: {
        type: DataTypes.STRING(64),
        field: 'PropertyType',
        allowNull: true,
      },
      PropertySubType: {
        type: DataTypes.STRING(64),
        field: 'PropertySubType',
        allowNull: true,
      },
      UniversalPropertyId: {
        type: DataTypes.STRING(128),
        field: 'UniversalPropertyId',
        allowNull: true,
      },
      UniversalPropertySubId: {
        type: DataTypes.STRING(128),
        field: 'UniversalPropertySubId',
        allowNull: true,
      },
      LotFeatures: {
        type: DataTypes.JSON,
        field: 'LotFeatures',
        allowNull: true,
      },
      LotSizeAcres: {
        type: DataTypes.DECIMAL(16, 2),
        field: 'LotSizeAcres',
        allowNull: true,
      },
      LotSizeArea: {
        type: DataTypes.DECIMAL(16, 2),
        field: 'LotSizeArea',
        allowNull: true,
      },
      LotSizeSquareFeet: {
        type: DataTypes.DECIMAL(16, 0),
        field: 'LotSizeSquareFeet',
        allowNull: true,
      },
      LotSizeUnits: {
        type: DataTypes.STRING(25),
        field: 'LotSizeUnits',
        allowNull: true,
      },
      AccessibilityFeatures: {
        type: DataTypes.JSON,
        field: 'AccessibilityFeatures',
        allowNull: true,
      },
      AttachedGarageYN: {
        type: DataTypes.CHAR(1),
        field: 'AttachedGarageYN',
        allowNull: true,
      },
      Basement: {
        type: DataTypes.JSON,
        field: 'Basement',
        allowNull: true,
      },
      BasementYN: {
        type: DataTypes.CHAR(1),
        field: 'BasementYN',
        allowNull: true,
      },
      BathroomsFull: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'BathroomsFull',
        allowNull: true,
      },
      BathroomsHalf: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'BathroomsHalf',
        allowNull: true,
      },
      BathroomsOneQuarter: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'BathroomsOneQuarter',
        allowNull: true,
      },
      BathroomsPartial: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'BathroomsPartial',
        allowNull: true,
      },
      BathroomsThreeQuarter: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'BathroomsThreeQuarter',
        allowNull: true,
      },
      BathroomsTotalInteger: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'BathroomsTotalInteger',
        allowNull: true,
      },
      BedroomsPossible: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'BedroomsPossible',
        allowNull: true,
      },
      BedroomsTotal: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'BedroomsTotal',
        allowNull: true,
      },
      ConstructionMaterials: {
        type: DataTypes.JSON,
        field: 'ConstructionMaterials',
        allowNull: true,
      },
      Cooling: {
        type: DataTypes.JSON,
        field: 'Cooling',
        allowNull: true,
      },
      CoolingYN: {
        type: DataTypes.CHAR(1),
        field: 'CoolingYN',
        allowNull: true,
      },
      DoorFeatures: {
        type: DataTypes.JSON,
        field: 'DoorFeatures',
        allowNull: true,
      },
      ExteriorFeatures: {
        type: DataTypes.JSON,
        field: 'ExteriorFeatures',
        allowNull: true,
      },
      FireplaceFeatures: {
        type: DataTypes.JSON,
        field: 'FireplaceFeatures',
        allowNull: true,
      },
      FireplacesTotal: {
        type: DataTypes.TINYINT,
        field: 'FireplacesTotal',
        allowNull: true,
      },
      FireplaceYN: {
        type: DataTypes.CHAR(1),
        field: 'FireplaceYN',
        allowNull: true,
      },
      Flooring: {
        type: DataTypes.JSON,
        field: 'Flooring',
        allowNull: true,
      },
      GarageSpaces: {
        type: DataTypes.TINYINT,
        field: 'GarageSpaces',
        allowNull: true,
      },
      GarageYN: {
        type: DataTypes.CHAR(1),
        field: 'GarageYN',
        allowNull: true,
      },
      Heating: {
        type: DataTypes.JSON,
        field: 'Heating',
        allowNull: true,
      },
      HeatingYN: {
        type: DataTypes.CHAR(1),
        field: 'HeatingYN',
        allowNull: true,
      },
      InteriorFeatures: {
        type: DataTypes.JSON,
        field: 'InteriorFeatures',
        allowNull: true,
      },
      NewConstructionYN: {
        type: DataTypes.CHAR(1),
        field: 'NewConstructionYN',
        allowNull: true,
      },
      OpenParkingSpaces: {
        type: DataTypes.TINYINT,
        field: 'OpenParkingSpaces',
        allowNull: true,
      },
      OpenParkingYN: {
        type: DataTypes.CHAR(1),
        field: 'OpenParkingYN',
        allowNull: true,
      },
      ParkingFeatures: {
        type: DataTypes.JSON,
        field: 'ParkingFeatures',
        allowNull: true,
      },
      ParkingTotal: {
        type: DataTypes.TINYINT,
        field: 'ParkingTotal',
        allowNull: true,
      },
      PropertyAttachedYN: {
        type: DataTypes.CHAR(1),
        field: 'PropertyAttachedYN',
        allowNull: true,
      },
      PropertyCondition: {
        type: DataTypes.JSON,
        field: 'PropertyCondition',
        allowNull: true,
      },
      Roof: {
        type: DataTypes.JSON,
        field: 'Roof',
        allowNull: true,
      },
      WindowFeatures: {
        type: DataTypes.JSON,
        field: 'WindowFeatures',
        allowNull: true,
      },
      YearBuilt: {
        type: DataTypes.INTEGER(4),
        field: 'YearBuilt',
        allowNull: true,
        set(value: any) {
          if (parseInt(value)) {
            this.setDataValue('YearBuilt', parseInt(value))
          }
          this.setDataValue('YearBuilt', null)
        },
      },
      Rooms: {
        type: DataTypes.TEXT,
        field: 'Rooms',
        allowNull: true,
      },
      RoomsTotal: {
        type: DataTypes.TINYINT,
        field: 'RoomsTotal',
        allowNull: true,
      },
      RoomType: {
        type: DataTypes.JSON,
        field: 'RoomType',
        allowNull: true,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: false,
      tableName: 'property_data',
    }
  )
  return PropertyData
}
