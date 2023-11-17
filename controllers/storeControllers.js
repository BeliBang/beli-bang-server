const { User, Store, RatingStore, Food, RatingFood, sequelize } = require("../models");
const imageKit = require("../helpers/imageKit");

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
      next(error);
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
      const { name, description } = req.body;

      await imageKit.upload({
        file: req.file.buffer.toString('base64'),
        fileName: `${Date.now()}_${req.file.originalname}`,
        folder: 'BB_Store',
        useUniqueFileName: false
      }, async function (err, fileResponse) {
        if(err) {
          return res.status(500).json({
            message: "Error occured during photo upload. Please try again."
          })
        }

        await Store.create({ name, imageUrl: fileResponse.url, description, UserId: req.user.id });
        res.status(201).json({ message: "Success create store"});
      })
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
