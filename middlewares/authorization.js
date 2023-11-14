const { Store } = require('../models')

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
    const store = await Store.findByPk(req.params.id)
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

module.exports = { sellerAuthorization, ownerAuthorization }