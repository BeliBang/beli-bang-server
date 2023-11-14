'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    imageUrl: DataTypes.TEXT,
    description: DataTypes.TEXT,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    area: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};