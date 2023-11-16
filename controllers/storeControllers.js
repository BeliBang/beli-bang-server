const { User, Store, RatingStore, Food, RatingFood, sequelize } = require("../models");

class storeControllers {
  static async showStores(req, res, next) {
    try {
      // Filter by Location, order ASC
      const stores = await Store.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      res.status(200).json(stores);
    } catch (error) {
      next (error)
    }
  }

  static async findStore(req, res, next) {
    try {
      const { id } = req.params;
      const store = await Store.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Food,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      if (!store) {
        throw { status: 404, message: "Store Not Found" };
      }
      res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }

  static async createStore(req, res, next) {
    try {
      const { name, imageUrl, description } = req.body;

      await Store.create({ name, imageUrl, description, UserId: req.user.id });
      res.status(201).json("Success create store");
    } catch (error) {
      next(error);
    }
  }

  static async updateStore(req, res, next) {
    try {
      const { name, imageUrl, description } = req.body;

      await Store.update(
        { name, imageUrl, description },
        { where: { id: req.params.id } }
      );
      res.status(200).json("Success updating store information");
    } catch (error) {
      next(error);
    }
  }

  static async deleteStore(req, res, next) {
    try {
      await Store.destroy({ where: { id: req.params.id } });
      res.status(200).json("Store has been deleted");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = storeControllers;
