const express = require("express");
const ratingStoreControllers = require("../controllers/ratingStoreControllers");
const router = express.Router();

router.get("/ratingstore/:storeId", ratingStoreControllers.findRating);
router.post("/ratingstore/:storeId", ratingStoreControllers.createRating);
router.delete("/ratingstore/:id", ratingStoreControllers.deleteRating);

module.exports = router;