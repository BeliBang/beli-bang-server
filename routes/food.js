const express = require("express")
const router = express.Router()
const foodControllers = require("../controllers/foodControllers")
const { sellerAuthorization, foodOwnerAuthorization } = require("../middlewares/authorization")
const upload = require("../middlewares/multer")

router.post("/foods", sellerAuthorization, upload.single('imageUrl'), foodControllers.createFood)
router.get("/foods/:id", foodControllers.findFood)
router.put("/foods/:id", foodOwnerAuthorization, foodControllers.updateFood)
router.delete("/foods/:id", foodOwnerAuthorization, foodControllers.deleteFood)

module.exports = router