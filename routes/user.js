const express = require("express");
const userControllers = require("../controllers/userControllers");
const upload = require("../middlewares/multer");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.use(authentication);
router.put("/users", upload.single("profilePicture"), userControllers.editProfilePicture);
router.get("/users/:id", userControllers.fetchById);

module.exports = router;
