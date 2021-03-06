import { Model } from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class ImportConfig extends Model {}
  ImportConfig.init(
    {
      Id: {
        type: DataTypes.BIGINT,
        field: 'Id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      LegacyImportId: {
        type: DataTypes.STRING(128),
        field: 'LegacyImportId',
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING(255),
        field: 'Name',
        allowNull: false,
      },
      SearchQuery: {
        type: DataTypes.STRING(255),
        field: 'SearchQuery',
        allowNull: false,
      },
      ProviderType: {
        type: DataTypes.STRING(255),
        field: 'ProviderType',
        allowNull: false,
      },
      ProviderUrl: {
        type: DataTypes.STRING(255),
        field: 'ProviderUrl',
        allowNull: false,
      },
      ProviderUsername: {
        type: DataTypes.STRING(255),
        field: 'ProviderUsername',
        allowNull: true,
      },
      ProviderPassword: {
        type: DataTypes.STRING(255),
        field: 'ProviderPassword',
        allowNull: true,
      },
      UseProxy: {
        type: DataTypes.TINYINT(1),
        field: 'UseProxy',
        defaultValue: 0,
        allowNull: false,
      },
      AdditionalHeaders: {
        type: DataTypes.JSON,
        field: 'AdditionalHeaders',
        allowNull: true,
      },
      RequestLimit: {
        type: DataTypes.INTEGER,
        field: 'RequestLimit',
        allowNull: true,
      },
      IsActive: {
        type: DataTypes.TINYINT(1),
        field: 'IsActive',
        defaultValue: 0,
        allowNull: false,
      },
      RunIntervalMinutes: {
        type: DataTypes.INTEGER,
        field: 'RunIntervalMinutes',
        defaultValue: 60,
        allowNull: false,
      },
      AdditionalConfig: {
        type: DataTypes.JSON,
        field: 'AdditionalConfig',
        allowNull: true,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        field: 'CreatedAt',
        allowNull: false,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        field: 'UpdatedAt',
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      DeletedAt: {
        type: DataTypes.DATE,
        field: 'DeletedAt',
        allowNull: true,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: false,
      tableName: 'import_config',
    }
  )
  return ImportConfig
}
