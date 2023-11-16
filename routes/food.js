const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const foodControllers = require("../controllers/foodControllers");
const { sellerAuthorization, foodOwnerAuthorization } = require("../middlewares/authorization");

router.use(authentication)
router.post("/foods", sellerAuthorization, foodControllers.createFood);
router.get("/foods/:id", foodControllers.findFood);
router.put("/foods/:id", foodOwnerAuthorization, foodControllers.updateFood);
router.delete("/foods/:id", foodOwnerAuthorization, foodControllers.deleteFood);

module.exports = router;