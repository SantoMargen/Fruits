const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const { authorization } = require('../middlewares/authentication')


router.post('/roles', authorization, UserController.registerRoles)
router.post('/fruits', authorization, UserController.CreateFruits)

router.get('/fruits', UserController.getFruits)


module.exports = router;