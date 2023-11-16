const { RatingFood } = require('../models')

class ratingFoodControllers {
  static async findRating(req, res, next) {
    try {
      const { foodId } = req.params

      const rating = await RatingFood.findAll({
        where: {FoodId: foodId}
      })
      res.status(200).json(rating)
    } catch (error) {
      next (error)
    }
  }

  static async createRating(req, res, next) {
    try {
      const { foodId } = req.params

      const checker = await RatingFood.findOne({
        where: { FoodId: foodId, UserId: req.user.id }
      })
      if (checker) {
        throw { status: 409, message: "Food already rated" }
      }
      await RatingFood.create({ FoodId: foodId, UserId: req.user.id })
      res.status(201).json("Success rating food")
    } catch (error) {
      next (error)
    }
  }

  static async deleteRating(req, res, next) {
    try {
      const { id } = req.params

      const rating = await RatingFood.findByPk(id)
      if (!rating) {
        throw { status: 404, message: "Rating data not found"}
      } else if (rating.UserId != req.user.id) {
        throw { status: 403, message: "Not authorized" }
      }
      await RatingFood.destroy({where: { id } })
      
      res.status(200).json("Rating has been removed")
    } catch (error) {
      next (error)
    }
  }
}

module.exports = ratingFoodControllers