const { RatingStore } = require('../models')

class ratingStoreControllers {
  static async findRating(req, res, next) {
    try {
      const { storeId } = req.params

      const rating = await RatingStore.findAll({
        where: {StoreId: storeId}
      })
      res.status(200).json(rating)
    } catch (error) {
      next (error)
    }
  }

  static async createRating(req, res, next) {
    try {
      const { storeId } = req.params

      const checker = await RatingStore.findOne({
        where: { StoreId: storeId, UserId: req.user.id }
      })
      if (checker) {
        throw { status: 409, message: "Store already rated" }
      }
      await RatingStore.create({ StoreId: storeId, UserId: req.user.id })
      res.status(201).json("Success rating store")
    } catch (error) {
      next (error)
    }
  }

  static async deleteRating(req, res, next) {
    try {
      const { id } = req.params

      const rating = await RatingStore.findByPk(id)
      if (!rating) {
        throw { status: 404, message: "Rating data not found"}
      } else if (rating.UserId != req.user.id) {
        throw { status: 403, message: "Not authorized" }
      }
      await RatingStore.destroy({where: { id } })
      
      res.status(200).json("Rating has been removed")
    } catch (error) {
      next (error)
    }
  }
}

module.exports = ratingStoreControllers