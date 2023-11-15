const { Store } = require('../models')

async function sellerAuthorization(req, res, next) {
  try {
    if (req.user.role !== 'Seller') {
      throw { status: 403, message: "Forbidden for the seller" };
    }
    next()
  } catch (error) {
    next(error)
  }
}

async function ownerAuthorization(req, res, next) {
  try {
    const store = await Store.findByPk(req.params.id)
    if (!store) {
      throw { status: 404, message: "Store Not Found" };
    }
    if (req.user.role !== 'Seller' && req.user.id !== store.UserId) {
      throw { status: 403, message: "Forbidden for the owner" };
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { sellerAuthorization, ownerAuthorization }