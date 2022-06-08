const { Model } = require('sequelize');

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model {}
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        field: 'name',
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: true,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: 'users',
    }
  );
  return User;
};
