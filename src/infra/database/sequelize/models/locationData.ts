import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
    class LocationData extends Model {}
    LocationData.init(
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
        Latitude: {
            type: DataTypes.DECIMAL(10, 8),
            field: 'Latitude',
            allowNull: true,
        },
        Longitude: {
            type: DataTypes.DECIMAL(10, 8),
            field: 'Longitude',
            allowNull: true,
        },
        UnitNumber: {
            type: DataTypes.INTEGER,
            field: 'UnitNumber',
            allowNull: false,
        },
        StreetName: {
            type: DataTypes.STRING(128),
            field: 'StreetName',
            allowNull: false,
        },
        StreetNumber: {
            type: DataTypes.STRING(64),
            field: 'StreetNumber',
            allowNull: false,
        },
        StreetAdditionalInfo: {
            type: DataTypes.STRING(255),
            field: 'StreetAdditionalInfo',
            allowNull: true,
        },
        City: {
            type: DataTypes.STRING(255),
            field: 'City',
            allowNull: true,
        },
        CountyOrParish: {
            type: DataTypes.STRING(255),
            field: 'CountyOrParish',
            allowNull: true,
        },
        Township: {
            type: DataTypes.STRING(255),
            field: 'Township',
            allowNull: true,
        },
        StateOrProvince: {
            type: DataTypes.STRING(255),
            field: 'StateOrProvince',
            allowNull: true,
        },
        PostalCode: {
            type: DataTypes.STRING(255),
            field: 'PostalCode',
            allowNull: true,
        },
        PostalCodePlus4: {
            type: DataTypes.STRING(255),
            field: 'PostalCodePlus4',
            allowNull: true,
        },
        Country: {
            type: DataTypes.STRING(255),
            field: 'Country',
            allowNull: true,
        },
        UnparsedAddress: {
            type: DataTypes.TEXT,
            field: 'UnparsedAddress',
            allowNull: true,
        },
        SchoolGroup: {
            type: DataTypes.JSON,
            field: 'SchoolGroup',
            allowNull: true,
        },
        AreaGroup: {
            type: DataTypes.JSON,
            field: 'AreaGroup',
            allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: 'location_data',
      }
    );
    return LocationData;
  };
  