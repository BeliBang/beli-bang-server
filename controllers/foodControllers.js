const { Food, RatingFood } = require('../models')

class foodControllers {
    static async findFood(req, res, next) {
    try {
      const food = await Food.findByPk(req.params.id, {
        include: RatingFood
      })
      if (!food) {
        throw { status: 404, message: "Food Not Found" }
      }
      res.status(200).json(food)
    } catch (error) {
      next (error)
    }
  }

  static async createFood(req, res, next) {
    try {
      console.log(req.body)
      const { name, imageUrl, price, description, StoreId } = req.body

      await Food.create({name, imageUrl, price, description, StoreId})
      res.status(201).json("Success adding new food")
    } catch (error) {
      next (error)
    }
  }

  static async updateFood(req, res, next) {
    try {
      console.log(req.body)
      const { name, imageUrl, price, description } = req.body
      
      await Food.update({name, imageUrl, price, description},
        {where: {id: req.params.id} }
      )
      res.status(200).json("Success updating food information")
    } catch (error) {
      next (error)
    }
  }

  static async deleteFood(req, res, next) {
    try {
      await Food.destroy({where: {id: req.params.id} })
      res.status(200).json("Food has been deleted")
    } catch (error) {
      next (error)
    }
  }
}

module.exports = foodControllers