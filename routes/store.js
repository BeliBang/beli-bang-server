const express = require("express");
const router = express.Router();
const storeControllers = require("../controllers/storeControllers");
const { sellerAuthorization, ownerAuthorization } = require("../middlewares/authorization");
const upload = require("../middlewares/multer");

router.get("/stores", storeControllers.showStores);
router.post("/stores", sellerAuthorization, upload.single('imageUrl'), storeControllers.createStore);
router.get("/stores/seller", sellerAuthorization, storeControllers.findStoreUser);
router.get("/stores/:id", storeControllers.findStore);
router.put("/stores/:id", ownerAuthorization, storeControllers.updateStore);
router.delete("/stores/:id", ownerAuthorization, storeControllers.deleteStore);

module.exports = router;