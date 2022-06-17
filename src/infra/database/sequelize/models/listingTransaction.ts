import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
    class ListingTransaction extends Model {}
    ListingTransaction.init(
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
        DateClosed: {
          type: DataTypes.DATE,
          field: 'DateClosed',
          allowNull: true,
        },
        BuyerAgentKey: {
          type: DataTypes.STRING(128),
          field: 'BuyerAgentKey',
          allowNull: true,
        },
        ListAgentKey: {
          type: DataTypes.STRING(128),
          field: 'ListAgentKey',
          allowNull: true,
        },
        ListPrice: {
          type: DataTypes.DECIMAL(16, 2),
          field: 'ListPrice',
          allowNull: true,
        },
        ClosedPrice: {
            type: DataTypes.DECIMAL(16, 2),
            field: 'ClosedPrice',
            allowNull: true,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: 'listing_transactions',
      }
    );
    return ListingTransaction;
  };
  