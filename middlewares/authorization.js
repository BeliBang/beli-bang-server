const { Store, Food } = require('../models')

async function sellerAuthorization(req, res, next) {
  try {
    if (req.user.role !== 'Seller') {
      throw { name: 'SellerAuthorization' }
    }
    next()
  } catch (error) {
    next(error)
  }
}

async function ownerAuthorization(req, res, next) {
  try {
    const store = await Store.findByPk(req.params.storeId)
    if (!store) {
      throw { name: 'NotFound' }
    }
    if (req.user.role !== 'Seller' && req.user.id !== store.UserId) {
      throw { name: 'OwnerAuthorization' }
    }
    next()
  } catch (error) {
    next(error)
  }
}

async function foodOwnerAuthorization(req, res, next) {
  try {
    const food = await Food.findByPk(req.params.id, {
      include : { model: Store, attributes: ["UserId"]}
    })
    if (!food) {
      throw { status: 404, message: "Food not found" }
    }
    if (food.Store.UserId !== req.user.id) {
      throw { status: 403, message: "Not the Owner" }
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { sellerAuthorization, ownerAuthorization, foodOwnerAuthorization }