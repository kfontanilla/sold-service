module.exports = (sequelize: any, DataTypes: any) => {
    class ListingTransaction extends Model {}
    ListingTransaction.init(
      {
        Id: {
          type: DataTypes.BIGINT,
          field: 'Id',
          autoIncrement: true,
          primaryKey: true
        },
        ListingDataId: {
          type: DataTypes.BIGINT,
          field: 'ListingDataId',
        },
        DateClosed: {
          type: DataTypes.DATE,
          field: 'DateClosed',
        },
        BuyerAgentKey: {
          type: DataTypes.STRING(128),
          field: 'BuyerAgentKey',
        },
        ListAgentKey: {
          type: DataTypes.STRING(128),
          field: 'ListAgentKey',
        },
        ListPrice: {
          type: DataTypes.DECIMAL(16, 2),
          field: 'ProviderUsername',
        },
        ClosedPrice: {
            type: DataTypes.DECIMAL(16, 2),
            field: 'ClosedPrice',
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
  