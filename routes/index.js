const express = require("express");
const router = express.Router();

const userRouter = require("./user")
const storeRouter = require("./store")

router.use(userRouter)
router.use(storeRouter)

module.exports = router;