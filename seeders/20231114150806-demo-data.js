"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../data/users.json");
    const stores = require("../data/stores.json");
    const foods = require("../data/foods.json");

    const dataUsers = users.map((el) => {
      delete el.id;
      el.password = hashPassword(el.password);
      el.profilePicture =
        "https://www.mmm.ucar.edu/sites/default/files/img/default-avatar.jpg";
      if ((el.role == "Seller")) {
        el.location = Sequelize.fn(
          "ST_GeomFromText",
          "POINT(107.59278847659893 -6.942981263106864)"
        );
      }
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    const dataStores = stores.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    const dataFoods = foods.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Users", dataUsers);
    await queryInterface.bulkInsert("Stores", dataStores);
    await queryInterface.bulkInsert("Food", dataFoods);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Food", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Stores", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
