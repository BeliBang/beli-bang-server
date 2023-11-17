const express = require("express");
const ratingFoodControllers = require("../controllers/ratingFoodControllers");
const router = express.Router();

router.get("/foods/rating/:foodId", ratingFoodControllers.findRating);
router.post("/foods/rating/:foodId", ratingFoodControllers.createRating);
router.delete("/foods/rating/:id", ratingFoodControllers.deleteRating);

module.exports = router;