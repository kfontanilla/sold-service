import { Model } from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class PropertyDetail extends Model {}
  PropertyDetail.init(
    {
      Id: {
        type: DataTypes.BIGINT,
        field: 'Id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      PropertyDataId: {
        type: DataTypes.BIGINT,
        field: 'PropertyDataId',
        unique: true,
        allowNull: false,
      },
      ListingKey: {
        type: DataTypes.STRING(128),
        field: 'ListingKey',
        unique: true,
        allowNull: false,
      },
      BusinessGroup: {
        type: DataTypes.JSON,
        field: 'BusinessGroup',
        allowNull: true,
      },
      CharacteristicGroup: {
        type: DataTypes.JSON,
        field: 'CharacteristicGroup',
        allowNull: true,
      },
      EquipmentGroup: {
        type: DataTypes.JSON,
        field: 'EquipmentGroup',
        allowNull: true,
      },
      FarmingGroup: {
        type: DataTypes.JSON,
        field: 'FarmingGroup',
        allowNull: true,
      },
      FinancialGroup: {
        type: DataTypes.JSON,
        field: 'FinancialGroup',
        allowNull: true,
      },
      HOAGroup: {
        type: DataTypes.JSON,
        field: 'HOAGroup',
        allowNull: true,
      },
      OccupantOwnerGroup: {
        type: DataTypes.JSON,
        field: 'OccupantOwnerGroup',
        allowNull: true,
      },
      StructureGroup: {
        type: DataTypes.JSON,
        field: 'StructureGroup',
        allowNull: true,
      },
      TaxGroup: {
        type: DataTypes.JSON,
        field: 'TaxGroup',
        allowNull: true,
      },
      UtilitiesGroup: {
        type: DataTypes.JSON,
        field: 'UtilitiesGroup',
        allowNull: true,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: false,
      tableName: 'property_details',
    }
  )
  return PropertyDetail
}
