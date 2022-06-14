module.exports = (sequelize: any, DataTypes: any) => {
  class ImportConfig extends Model {}
  ImportConfig.init(
    {
      Id: {
        type: DataTypes.BIGINT,
        field: 'Id',
        autoIncrement: true,
        primaryKey: true
      },
      LegacyImportId: {
        type: DataTypes.STRING(128),
        field: 'LegacyImportId',
      },
      Name: {
        type: DataTypes.STRING(255),
        field: 'Name',
      },
      ProviderType: {
        type: DataTypes.STRING(255),
        field: 'ProviderType',
      },
      ProviderUrl: {
        type: DataTypes.STRING(255),
        field: 'ProviderUrl',
      },
      ProviderUsername: {
        type: DataTypes.STRING(255),
        field: 'ProviderUsername',
      },
      ProviderPassword: {
        type: DataTypes.STRING(255),
        field: 'ProviderPassword',
      },
      UseProxy: {
        type: DataTypes.TINYINT(1),
        field: 'UseProxy',
      },
      AdditionalHeaders: {
        type: DataTypes.JSON,
        field: 'AdditionalHeaders',
      },
      RequestLimit: {
        type: DataTypes.INT,
        field: 'RequestLimit',
      },
      IsActive: {
        type: DataTypes.TINYINT(1),
        field: 'IsActive',
      },
      RunIntervalMinutes: {
        type: DataTypes.INT,
        field: 'RunIntervalMinutes',
      },
      AdditionalConfig: {
        type: DataTypes.JSON,
        field: 'AdditionalConfig',
      },
      CreatedAt: {
        type: DataTypes.DATETIME, 
        defaultValue: DataTypes.NOW,
        field: 'CreatedAt',
      },
      UpdatedAt: {
        type: DataTypes.DATETIME,
        field: 'AdditionalConfig',
      },
      DeletedAt: {
        type: DataTypes.JSON,
        field: 'AdditionalConfig',
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: 'import_config',
    }
  );
  return ImportConfig;
};
