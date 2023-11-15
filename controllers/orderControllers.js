const { Store, User, Food, Order } = require('../models')

class orderControllers {
  static async showOrders(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: { UserId: req.user.id }
      })
      res.status(200).json(orders)
    } catch (error) {
      next (error)
    }
  }

  static async findOrder(req, res, next) {
    try {
      const order = await Order.findByPk(req.params.id, {
        include: Store
      })
      if (!order) {
        throw { status: 404, message: "Order Not Found" }
      }
      res.status(200).json(order)
    } catch (error) {
      next (error)
    }
  }

  static async createOrder(req, res, next) {
    try {
      console.log(req.body)
      const { StoreId, notes, status } = req.body

      await Order.create({StoreId, UserId: req.user.id, notes, status})
      res.status(201).json("Success creating order")
    } catch (error) {
      next (error)
    }
  }

  static async updateOrder(req, res, next) {
    try {
      console.log(req.body)
      const { status } = req.body

      await Order.update({status},
        {where: {id: req.params.id} } 
      )
      res.status(200).json("Success updating order status")
    } catch (error) {
      next (error)
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      await Order.destroy({where: {id: req.params.id} })
      res.status(200).json("Order has been deleted")
    } catch (error) {
      next (error)
    }
  }
}

module.exports = orderControllers