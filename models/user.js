'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Store)
      User.hasMany(models.Store)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
    profilePicture: DataTypes.TEXT,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    area: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password)
  })

  return User;
};