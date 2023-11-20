const { Store, User, Food, Order } = require("../models");

class orderControllers {
  static async showOrderCustomers(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: { UserId: req.user.id },
      });
      if (orders.length == 0) {
        throw { status: 404, message: "No order has been made" };
      }
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async showOrderSellers(req, res, next) {
    try {
      const id = req.user.id;

      const store = await Store.findOne({ where: { UserId: id } });
      const orders = await Order.findAll({
        where: { StoreId: store.id },
        include: [
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          },
        ],
      });
      if (orders.length == 0) {
        throw { status: 404, message: "No order has been made" };
      }
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async findOrder(req, res, next) {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        throw { status: 404, message: "Order Not Found" };
      }

      const id = order.StoreId;
      const store = await Store.findByPk(id, {
        include: [
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          },
        ],
      });

      const customer = await User.findOne({ where: { id: order.UserId } });

      if (!store || !customer) {
        throw { status: 401, message: "Invalid store/customer" };
      }

      res.status(200).json({ store, customer });
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req, res, next) {
    try {
      console.log(req.body);
      const { StoreId, status } = req.body;

      await Order.create({ StoreId, UserId: req.user.id, status });
      res.status(201).json({ message: "Success creating order" });
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req, res, next) {
    try {
      console.log(req.body);
      const { status } = req.body;

      const order = await Order.findByPk(req.params.id);
      if (!order) {
        throw { status: 404, message: "Order Not Found" };
      }

      await Order.update({ status }, { where: { id: req.params.id } });
      res.status(200).json({ message: "Success updating order status" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        throw { status: 404, message: "Order Not Found" };
      }
      await Order.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Order has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = orderControllers;
