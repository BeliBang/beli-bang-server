'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RatingFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RatingFood.init({
    UserId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RatingFood',
  });
  return RatingFood;
};