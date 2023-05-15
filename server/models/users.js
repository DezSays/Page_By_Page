"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      favorite: DataTypes.ARRAY(Sequelize.STRING(100000)),
      read: DataTypes.ARRAY(Sequelize.STRING(100000)),
      tbr: DataTypes.ARRAY(Sequelize.STRING(100000)),
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
