const { User, Store, RatingStore, Food, RatingFood } = require('../models');
const imageKit = require('../helpers/imageKit');

class storeControllers {
  static async showStores(req, res, next) {
    try {
      // Filter by Location, order ASC
      const stores = await Store.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { status: true },
        include: [
          {
            model: User,
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
          },
        ],
      });
      if (stores.length == 0) {
        throw { status: 404, message: 'Sorry, there is no available store near your area' };
      }
      res.status(200).json(stores);
    } catch (error) {
      next(error);
    }
  }

  static async findStore(req, res, next) {
    try {
      const { id } = req.params;
      const UserId = req.userId;
      const store = await Store.findOne({
        where: { UserId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Food,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: User,
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
          },
        ],
      });
      if (!store) {
        throw { status: 404, message: 'Store Not Found' };
      }
      res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }

  static async findStoreUser(req, res, next) {
    try {
      const UserId = req.user.id;
      const storeSeller = await Store.findOne({
        where: { UserId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Food,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: User,
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
          },
        ],
      });
      if (!storeSeller) {
        throw { status: 404, message: 'You have not registered a store' };
      }
      res.status(200).json(storeSeller);
    } catch (error) {
      next(error);
    }
  }

  static async createStore(req, res, next) {
    try {
      const { name, description } = req.body;

      const store = await Store.findOne({ where: { UserId: req.user.id } });
      if (store) {
        throw { status: 401, message: 'You already have a store' };
      }
      if (!req.file) {
        throw { status: 400, message: 'Image store is required' };
      }
      if (!name) {
        throw { status: 400, message: 'Name is required' };
      }
      if (!description) {
        throw { status: 400, message: 'Description is required' };
      }

      await imageKit.upload(
        {
          file: req.file.buffer.toString('base64'),
          fileName: `${Date.now()}_${req.file.originalname}`,
          folder: 'BB_Store',
          useUniqueFileName: false,
        },
        async function (err, fileResponse) {
          if (err) {
            return res.status(500).json({
              message: 'Error occured during photo upload. Please try again.',
            });
          }

          await Store.create({
            name,
            imageUrl: fileResponse.url,
            description,
            UserId: req.user.id,
          });
          res.status(201).json({ message: 'Success creating store' });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateStore(req, res, next) {
    try {
      console.log(req.params.id);
      const { name, imageUrl, description, status } = req.body;
      console.log({ name });
      await Store.update({ name, imageUrl, description, status }, { where: { id: req.params.id } });
      res.status(200).json({ message: 'Success updating store information' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteStore(req, res, next) {
    try {
      await Store.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: 'Store has been deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = storeControllers;
