const { Food, RatingFood, Store } = require("../models")
const imageKit = require("../helpers/imageKit")

class foodControllers {
  static async findFood(req, res, next) {
    try {
      const { id } = req.params
      const food = await Food.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: RatingFood
      })

      if (!food) {
        throw { status: 404, message: "Food not found" }
      }
      res.status(200).json(food);
    } catch (error) {
      next(error)
    }
  }

  static async createFood(req, res, next) {
    try {
      const { name, price, description } = req.body

      const store = await Store.findOne({
        where: { UserId: req.user.id }
      })

      if (!store) {
        throw { status: 404, message: "Please register your store first" }
      }

      const StoreId = store.id

      await imageKit.upload(
        {
          file: req.file.buffer.toString("base64"),
          fileName: `${Date.now()}_${req.file.originalname}`,
          folder: "BB_Food",
          useUniqueFileName: false
        },
        async function (err, fileResponse) {
          if (err) {
            return res.status(500).json({
              message: "Error occured during photo upload. Please try again."
            })
          }

          await Food.create({
            name,
            imageUrl: fileResponse.url,
            price,
            description,
            StoreId
          })
          res.status(201).json({ message: "Successfully added food" })
        }
      )
    } catch (error) {
      next(error)
    }
  }

  static async updateFood(req, res, next) {
    try {
      const { name, imageUrl, price, description } = req.body

      await Food.update(
        { name, imageUrl, price, description },
        { where: { id: req.params.id } }
      )
      res.status(200).json({ message: "Success updating food information" })
    } catch (error) {
      next(error)
    }
  }

  static async deleteFood(req, res, next) {
    try {
      await Food.destroy({ where: { id: req.params.id } })
      res.status(200).json({ message: "Food has been deleted" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = foodControllers;
