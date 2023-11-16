const express = require("express");
const ratingFoodControllers = require("../controllers/ratingFoodControllers");
const router = express.Router();

router.get("/ratingfood/:foodId", ratingFoodControllers.findRating);
router.post("/ratingfood/:foodId", ratingFoodControllers.createRating);
router.delete("/ratingfood/:id", ratingFoodControllers.deleteRating);

module.exports = router;