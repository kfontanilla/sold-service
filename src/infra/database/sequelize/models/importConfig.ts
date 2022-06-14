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
        type: DataTypes.INT,
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
        type: DataTypes.INT,
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
        type: DataTypes.DATETIME, 
        field: 'CreatedAt',
        allowNull: false,
      },
      UpdatedAt: {
        type: DataTypes.DATETIME,
        field: 'AdditionalConfig',
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      DeletedAt: {
        type: DataTypes.JSON,
        field: 'AdditionalConfig',
        allowNull: true,
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
