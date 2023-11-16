const express = require("express");
const router = express.Router();

const userRouter = require("./user")
const storeRouter = require("./store")
const foodRouter = require("./food")

router.use(userRouter)
router.use(storeRouter)
router.use(foodRouter)

module.exports = router;