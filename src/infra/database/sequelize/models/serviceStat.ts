import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class ServiceStat extends Model {}
  ServiceStat.init(
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
        allowNull: false,
      },
      ImportedListingCount: {
        type: DataTypes.BIGINT,
        field: 'ImportedListingCount',
        allowNull: true,
      },
      AvailableListingCount: {
        type: DataTypes.BIGINT,
        field: 'AvailableListingCount',
        allowNull: true,
      },
      ImageDownloaded: {
        type: DataTypes.BIGINT,
        field: 'ImageDownloaded',
        allowNull: true,
      },
      LastSuccessfulRun: {
        type: DataTypes.DATE,
        field: 'LastSuccessfulRun',
        allowNull: true,
      },
      LastScheduledRun: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'LastScheduledRun',
        allowNull: false,
      },
      ServiceDetails: {
        type: DataTypes.JSON,
        field: 'ServiceDetails',
        allowNull: true,
      },
    },
    {
      sequelize,
      underscored: false,
      tableName: 'service_stats',
    }
  )
  return ServiceStat
}
