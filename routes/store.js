const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const storeControllers = require("../controllers/storeControllers");
const { sellerAuthorization, ownerAuthorization } = require("../middlewares/authorization");

router.use(authentication)
router.get("/stores", storeControllers.showStores);
router.post("/stores", sellerAuthorization, storeControllers.createStore);
router.get("/stores/:id", storeControllers.findStore);
router.put("/stores/:id", ownerAuthorization, storeControllers.updateStore);
router.delete("/stores/:id", ownerAuthorization, storeControllers.deleteStore);

module.exports = router;