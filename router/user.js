const express = require('express')
const userController = require('../controller/userController')
const Auth = require('../utility/authentication')
const router = express.Router();

router.post('/register', userController.userRegistration)
router.post('/login', userController.userLogin)
router.get('/all-user', Auth.verifyToken, userController.userList)
router.get('/city-user', Auth.verifyToken, userController.listUserByCity)
router.get('/state-user', Auth.verifyToken, userController.listUserByState)
router.delete('/user/delete/:userId', Auth.verifyToken, userController.userRemove)
router.patch('/user/update/:id', Auth.verifyToken, userController.userUpdateOne)
router.patch('/user/update-many', Auth.verifyToken, userController.userUpdateMany)


module.exports = router;
