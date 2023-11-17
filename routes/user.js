const express = require("express");
const userControllers = require("../controllers/userControllers");
const upload = require("../middlewares/multer");
const router = express.Router();

router.post("/register", upload.single('profilePicture'), userControllers.register);
router.post("/login", userControllers.login);

module.exports = router;