const express = require("express");
const ratingStoreControllers = require("../controllers/ratingStoreControllers");
const router = express.Router();

router.get("/stores/rating/:storeId", ratingStoreControllers.findRating);
router.post("/stores/rating/:storeId", ratingStoreControllers.createRating);
router.delete("/stores/rating/:id", ratingStoreControllers.deleteRating);

module.exports = router;