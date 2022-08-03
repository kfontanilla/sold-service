import { Model } from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class AgentOfficeData extends Model {}
  AgentOfficeData.init(
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
        unique: true,
        allowNull: false,
      },
      BuyerAgentKey: {
        type: DataTypes.STRING(128),
        field: 'BuyerAgentKey',
        allowNull: true,
      },
      BuyerAgentMlsId: {
        type: DataTypes.STRING(128),
        field: 'BuyerAgentMlsId',
        allowNull: true,
      },
      BuyerAgentFullName: {
        type: DataTypes.STRING(128),
        field: 'BuyerAgentFullName',
        allowNull: true,
      },
      BuyerOfficeKey: {
        type: DataTypes.STRING(128),
        field: 'BuyerOfficeKey',
        allowNull: true,
      },
      BuyerOfficeMlsId: {
        type: DataTypes.STRING(128),
        field: 'BuyerOfficeMlsId',
        allowNull: true,
      },
      BuyerOfficeName: {
        type: DataTypes.STRING(128),
        field: 'BuyerOfficeName',
        allowNull: true,
      },
      CoBuyerAgentKey: {
        type: DataTypes.STRING(128),
        field: 'CoBuyerAgentKey',
        allowNull: true,
      },
      CoBuyerAgentMlsId: {
        type: DataTypes.STRING(128),
        field: 'CoBuyerAgentMlsId',
        allowNull: true,
      },
      CoBuyerAgentFullName: {
        type: DataTypes.STRING(128),
        field: 'CoBuyerAgentFullName',
        allowNull: true,
      },
      CoBuyerOfficeKey: {
        type: DataTypes.STRING(128),
        field: 'CoBuyerOfficeKey',
        allowNull: true,
      },
      CoBuyerOfficeName: {
        type: DataTypes.STRING(128),
        field: 'CoBuyerOfficeName',
        allowNull: true,
      },
      ListAgentKey: {
        type: DataTypes.STRING(128),
        field: 'ListAgentKey',
        allowNull: true,
      },
      ListAgentMlsId: {
        type: DataTypes.STRING(128),
        field: 'ListAgentMlsId',
        allowNull: true,
      },
      ListAgentFullName: {
        type: DataTypes.STRING(128),
        field: 'ListAgentFullName',
        allowNull: true,
      },
      ListOfficeKey: {
        type: DataTypes.STRING(128),
        field: 'ListOfficeKey',
        allowNull: true,
      },
      ListOfficeMlsId: {
        type: DataTypes.STRING(128),
        field: 'ListOfficeMlsId',
        allowNull: true,
      },
      ListOfficeName: {
        type: DataTypes.STRING(128),
        field: 'ListOfficeName',
        allowNull: true,
      },
      CoListAgentKey: {
        type: DataTypes.STRING(128),
        field: 'CoListAgentKey',
        allowNull: true,
      },
      CoListAgentMlsId: {
        type: DataTypes.STRING(128),
        field: 'CoListAgentMlsId',
        allowNull: true,
      },
      CoListAgentFullName: {
        type: DataTypes.STRING(128),
        field: 'CoListAgentFullName',
        allowNull: true,
      },
      CoListOfficeKey: {
        type: DataTypes.STRING(128),
        field: 'CoListOfficeKey',
        allowNull: true,
      },
      CoListOfficeMlsId: {
        type: DataTypes.STRING(128),
        field: 'CoListOfficeMlsId',
        allowNull: true,
      },
      CoListOfficeName: {
        type: DataTypes.STRING(128),
        field: 'CoListOfficeName',
        allowNull: true,
      },
    },
    {
      sequelize,
      underscored: false,
      timestamps: false,
      tableName: 'agent_office_data',
    }
  )
  return AgentOfficeData
}
