var express = require('express');
var router = express.Router();
var userController = require("../controllers/userCtr.js")

router.post('/register', userController.register);
router.post('/login',userController.login);
router.post('/isLogin',userController.isLogin);
router.post('/logout',userController.logout);
module.exports = router;