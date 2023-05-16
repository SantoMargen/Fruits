const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');


router.post('/roles', UserController.registerRoles)
router.get('/fruits', UserController.getFruits)


module.exports = router;