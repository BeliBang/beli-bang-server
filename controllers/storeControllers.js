const { Store, RatingStore, Food, RatingFood, sequelize } = require('../models')

class storeControllers {
  static async showStores(req, res, next) {
    try {
      // Filter by Location, order ASC
      const stores = await Store.findAll({
        include: RatingStore
      })
      res.status(200).json(stores)
    } catch (error) {
      next (error)
    }
  }

  static async findStore(req, res, next) {
    try {
      const store = await Store.findOne(
        { where: {id: req.params.id}},
        { include: [RatingStore, Food, RatingFood]}
      )
      if (!store) {
        throw { name: "NotFound" }
      }
      res.status(200).json(store)
    } catch (error) {
      next (error)
    }
  }

  static async createStore(req, res, next) {
    const t = await sequelize.transaction()
    try {
      console.log(req.body)
      const { name, imageUrl, description } = req.body

      const store = await Store.create({name, imageUrl, description, UserId: req.user.id})
      

      
    } catch (error) {
      next (error)
    }
  }

  static async updateStore(req, res, next) {
    try {
      
    } catch (error) {
      next (error)
    }
  }

  static async deleteStore(req, res, next) {
    try {
      
    } catch (error) {
      next (error)
    }
  }
}

module.exports = storeControllers