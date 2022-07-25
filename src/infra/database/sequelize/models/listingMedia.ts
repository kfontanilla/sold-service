import { Model } from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class ListingMedia extends Model {}
  ListingMedia.init(
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
      ListingKey: {
        type: DataTypes.STRING(128),
        field: 'ListingKey',
        allowNull: false,
      },
      FileUId: {
        type: DataTypes.STRING(255),
        field: 'FileUId',
        allowNull: true,
      },
      OriginalUrl: {
        type: DataTypes.STRING(255),
        field: 'OriginalUrl',
        allowNull: true,
      },
      CorrelationId: {
        type: DataTypes.STRING(32),
        field: 'CorrelationId',
        allowNull: true,
      },
      CreateAt: {
        type: DataTypes.DATE,
        field: 'CreateAt',
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
      SourceRecord: {
        type: DataTypes.JSON,
        field: 'SourceRecord',
        allowNull: true,
      },
      ChangedByMemberID: {
        type: DataTypes.STRING(64),
        field: 'ChangedByMemberID',
        allowNull: true,
      },
      ChangedByMemberKey: {
        type: DataTypes.STRING(64),
        field: 'ChangedByMemberKey',
        allowNull: true,
      },
      ChangedByMemberKeyNumeric: {
        type: DataTypes.BIGINT,
        field: 'ChangedByMemberKeyNumeric',
        allowNull: true,
      },
      ClassName: {
        type: DataTypes.STRING(64),
        field: 'ClassName',
        allowNull: true,
      },
      ImageHeight: {
        type: DataTypes.INTEGER,
        field: 'ImageHeight',
        allowNull: true,
      },
      ImageWidth: {
        type: DataTypes.INTEGER,
        field: 'ImageWidth',
        allowNull: true,
      },
      ImageOf: {
        type: DataTypes.STRING(64),
        field: 'ImageOf',
        allowNull: true,
      },
      ImageSizeDescription: {
        type: DataTypes.STRING(255),
        field: 'ImageSizeDescription',
        allowNull: true,
      },
      LongDescription: {
        type: DataTypes.TEXT,
        field: 'LongDescription',
        allowNull: true,
      },
      MediaCategory: {
        type: DataTypes.STRING(32),
        field: 'MediaCategory',
        allowNull: true,
      },
      MediaHTML: {
        type: DataTypes.TEXT,
        field: 'MediaHTML',
        allowNull: true,
      },
      MediaKey: {
        type: DataTypes.STRING(64),
        field: 'MediaKey',
        allowNull: true,
      },
      MediaKeyNumeric: {
        type: DataTypes.BIGINT,
        field: 'MediaKeyNumeric',
        allowNull: true,
      },
      MediaModificationTimestamp: {
        type: DataTypes.DATE,
        field: 'MediaModificationTimestamp',
        allowNull: true,
      },
      MediaObjectID: {
        type: DataTypes.STRING(64),
        field: 'MediaObjectID',
        allowNull: true,
      },
      MediaStatus: {
        type: DataTypes.STRING(32),
        field: 'MediaStatus',
        allowNull: true,
      },
      MediaType: {
        type: DataTypes.STRING(32),
        field: 'MediaType',
        allowNull: true,
      },
      MediaURL: {
        type: DataTypes.TEXT,
        field: 'MediaURL',
        allowNull: true,
      },
      ModificationTimestamp: {
        type: DataTypes.DATE,
        field: 'ModificationTimestamp',
        allowNull: true,
      },
      Order: {
        type: DataTypes.INTEGER,
        field: 'Order',
        allowNull: false,
        defaultValue: 0,
      },
      OriginatingSystemID: {
        type: DataTypes.STRING(64),
        field: 'OriginatingSystemID',
        allowNull: true,
      },
      OriginatingSystemMediaKey: {
        type: DataTypes.STRING(64),
        field: 'OriginatingSystemMediaKey',
        allowNull: true,
      },
      OriginatingSystemName: {
        type: DataTypes.STRING(64),
        field: 'OriginatingSystemName',
        allowNull: true,
      },
      Permission: {
        type: DataTypes.STRING(32),
        field: 'Permission',
        allowNull: true,
      },
      PreferredPhotoYN: {
        type: DataTypes.TINYINT(1),
        field: 'PreferredPhotoYN',
        allowNull: true,
        defaultValue: 0,
      },
      ResourceName: {
        type: DataTypes.STRING(32),
        field: 'ResourceName',
        allowNull: true,
      },
      ResourceRecordID: {
        type: DataTypes.STRING(64),
        field: 'ResourceRecordID',
        allowNull: true,
      },
      ResourceRecordKey: {
        type: DataTypes.STRING(64),
        field: 'ResourceRecordKey',
        allowNull: true,
      },
      ResourceRecordKeyNumeric: {
        type: DataTypes.BIGINT,
        field: 'ResourceRecordKeyNumeric',
        allowNull: true,
      },
      ShortDescription: {
        type: DataTypes.STRING(255),
        field: 'ShortDescription',
        allowNull: true,
      },
      SourceSystemID: {
        type: DataTypes.STRING(64),
        field: 'SourceSystemID',
        allowNull: true,
      },
      SourceSystemMediaKey: {
        type: DataTypes.STRING(64),
        field: 'SourceSystemMediaKey',
        allowNull: true,
      },
      SourceSystemName: {
        type: DataTypes.STRING(64),
        field: 'SourceSystemName',
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
  return ListingMedia
}
