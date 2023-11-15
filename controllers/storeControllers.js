const { Store, RatingStore, Food, RatingFood } = require('../models')

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
      const store = await Store.findByPk(req.params.id, {
        include: [RatingStore, Food, RatingFood]
      })
      if (!store) {
        throw { name: "NotFound" }
      }
      res.status(200).json(store)
    } catch (error) {
      next (error)
    }
  }

  static async createStore(req, res, next) {
    try {
      console.log(req.body)
      const { name, imageUrl, description } = req.body

      await Store.create({name, imageUrl, description, UserId: req.user.id})
      res.status(201).json("Success creating new store")
    } catch (error) {
      next (error)
    }
  }

  static async updateStore(req, res, next) {
    try {
      console.log(req.body)
      const { name, imageUrl, description } = req.body
      
      await Store.update({name, imageUrl, description},
        {where: {id: req.params.id} }
      )
      res.status(200).json("Success updating store information")
    } catch (error) {
      next (error)
    }
  }

  static async deleteStore(req, res, next) {
    try {
      await Store.destroy({where: {id: req.params.id} })
      res.status(200).json("Store has been deleted")
    } catch (error) {
      next (error)
    }
  }
}

module.exports = storeControllers