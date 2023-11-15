const express = require("express");
const router = express.Router();

const userRouter = require("./user")
const storeRouter = require("./store")
const foodRouter = require("./food")
const orderRouter = require("./order")

router.use(userRouter)
router.use(storeRouter)
router.use(foodRouter)
router.use(orderRouter)

module.exports = router;