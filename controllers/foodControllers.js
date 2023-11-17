const { Food, RatingFood, Store } = require("../models");

class foodControllers {
  static async findFood(req, res, next) {
    try {
      const { id } = req.params;
      const food = await Food.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: RatingFood,
      });

      if (!food) {
        throw { status: 404, message: "Food Not Found" };
      }
      res.status(200).json(food);
    } catch (error) {
      next(error);
    }
  }

  static async createFood(req, res, next) {
    try {
      const { name, imageUrl, price, description } = req.body;

      const store = await Store.findOne({
        where: { UserId: req.user.id },
      });

      if (!store) {
        throw { status: 404, message: "Store Not Found" };
      }

      const StoreId = store.id;

      await Food.create({ name, imageUrl, price, description, StoreId });
      res.status(201).json({ message: "Successfully added food" });
    } catch (error) {
      next(error);
    }
  }

  static async updateFood(req, res, next) {
    try {
      const { name, imageUrl, price, description } = req.body;

      await Food.update(
        { name, imageUrl, price, description },
        { where: { id: req.params.id } }
      );
      res.status(200).json({ message: "Success updating food information" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFood(req, res, next) {
    try {
      await Food.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Food has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = foodControllers;
