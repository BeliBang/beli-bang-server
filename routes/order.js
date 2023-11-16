const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const { sellerAuthorization } = require("../middlewares/authorization");

router.get("/orders", orderControllers.showOrders);
router.post("/orders", orderControllers.createOrder);
router.get("/orders/:id", orderControllers.findOrder);
router.put("/orders/:id", sellerAuthorization, orderControllers.updateOrder);
router.delete("/orders/:id", orderControllers.deleteOrder);

module.exports = router;