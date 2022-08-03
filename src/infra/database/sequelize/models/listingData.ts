import { Model } from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class ListingData extends Model {}
  ListingData.init(
    {
      Id: {
        type: DataTypes.BIGINT,
        field: 'Id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ImportConfigId: {
        type: DataTypes.BIGINT,
        field: 'ImportConfigId',
        unique: true,
        allowNull: false,
      },
      DisplayAsSold: {
        type: DataTypes.TINYINT(1),
        field: 'DisplayAsSold',
        allowNull: false,
        defaultValue: 0,
      },
      ListingKey: {
        type: DataTypes.STRING(128),
        field: 'ListingKey',
        unique: true,
        allowNull: false,
      },
      ListingKeyNumeric: {
        type: DataTypes.BIGINT,
        field: 'ListingKeyNumeric',
        allowNull: true,
      },
      ListingId: {
        type: DataTypes.STRING(128),
        field: 'ListingId',
        allowNull: false,
      },
      StandardStatus: {
        type: DataTypes.STRING(25),
        field: 'StandardStatus',
        allowNull: false,
      },
      MlsStatus: {
        type: DataTypes.STRING(50),
        field: 'MlsStatus',
        allowNull: false,
      },
      ListingService: {
        type: DataTypes.STRING(25),
        field: 'ListingService',
        allowNull: true,
      },
      ListingAgreement: {
        type: DataTypes.STRING(50),
        field: 'ListingAgreement',
        allowNull: true,
      },
      ListAOR: {
        type: DataTypes.STRING(50),
        field: 'ListAOR',
        allowNull: true,
      },
      LeaseConsideredYN: {
        type: DataTypes.CHAR(1),
        field: 'LeaseConsideredYN',
        allowNull: true,
      },
      HomeWarrantyYN: {
        type: DataTypes.CHAR(1),
        field: 'HomeWarrantyYN',
        allowNull: true,
      },
      ClosePrice: {
        type: DataTypes.DECIMAL(16, 2),
        field: 'ClosePrice',
        allowNull: true,
      },
      ListPrice: {
        type: DataTypes.DECIMAL(16, 2),
        field: 'ListPrice',
        allowNull: true,
      },
      OriginalListPrice: {
        type: DataTypes.DECIMAL(16, 2),
        field: 'OriginalListPrice',
        allowNull: true,
      },
      PreviousListPrice: {
        type: DataTypes.DECIMAL(16, 2),
        field: 'PreviousListPrice',
        allowNull: true,
      },
      DaysOnMarket: {
        type: DataTypes.INTEGER,
        field: 'DaysOnMarket',
        allowNull: true,
      },
      CloseDate: {
        type: DataTypes.DATEONLY,
        field: 'CloseDate',
        allowNull: false,
      },
      OriginatingSystemID: {
        type: DataTypes.STRING(128),
        field: 'OriginatingSystemID',
        allowNull: true,
      },
      OriginatingSystemKey: {
        type: DataTypes.STRING(128),
        field: 'OriginatingSystemKey',
        allowNull: true,
      },
      OriginatingSystemName: {
        type: DataTypes.STRING(128),
        field: 'OriginatingSystemName',
        allowNull: true,
      },
      SourceSystemID: {
        type: DataTypes.STRING(128),
        field: 'SourceSystemID',
        allowNull: true,
      },
      SourceSystemKey: {
        type: DataTypes.STRING(128),
        field: 'SourceSystemKey',
        allowNull: true,
      },
      SourceSystemName: {
        type: DataTypes.STRING(128),
        field: 'SourceSystemName',
        allowNull: true,
      },
      ModificationTimestamp: {
        type: DataTypes.DATE,
        field: 'ModificationTimestamp',
        allowNull: true,
      },
      OriginalEntryTimestamp: {
        type: DataTypes.DATE,
        field: 'OriginalEntryTimestamp',
        allowNull: true,
      },
      PhotosChangeTimestamp: {
        type: DataTypes.DATE,
        field: 'PhotosChangeTimestamp',
        allowNull: true,
      },
      DatesGroup: {
        type: DataTypes.JSON,
        field: 'DatesGroup',
        allowNull: true,
      },
      ClosingGroup: {
        type: DataTypes.JSON,
        field: 'ClosingGroup',
        allowNull: true,
      },
      CompensationGroup: {
        type: DataTypes.JSON,
        field: 'CompensationGroup',
        allowNull: true,
      },
      MediaGroup: {
        type: DataTypes.JSON,
        field: 'MediaGroup',
        allowNull: true,
      },
      ShowingGroup: {
        type: DataTypes.JSON,
        field: 'ShowingGroup',
        allowNull: true,
      },
      RemarksGroup: {
        type: DataTypes.JSON,
        field: 'RemarksGroup',
        allowNull: true,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: false,
      tableName: 'listing_data',
    }
  )
  return ListingData
}

