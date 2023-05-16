const express = require("express");
const router = express.Router();
const user = require("./user");
const { authentication } = require("../middlewares/authentication");
const UserController = require('../controller/userController');

router.post('/register', UserController.ragisterUser);
router.post('/login', UserController.loginUser);

router.use("/", authentication, user);

module.exports = router;