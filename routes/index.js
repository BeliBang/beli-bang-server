const express = require("express");
const router = express.Router();

const userRouter = require("./user")
const storeRouter = require("./store")
const foodRouter = require("./food")
const orderRouter = require("./order")
const likeRouter = require("./like")
const authentication = require("../middlewares/authentication")

router.use(userRouter)
router.use(authentication)
router.use(storeRouter)
router.use(foodRouter)
router.use(orderRouter)
router.use(likeRouter)

module.exports = router;