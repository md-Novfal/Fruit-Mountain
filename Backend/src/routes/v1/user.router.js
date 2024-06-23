const express = require('express');
const userController = require('../../controller/user.controller');
const tokenMiddleware = require('../../middleware/Authentication/sessionCheck');
const userValidation = require('../../validation/validation');

const router = express.Router();


/* GET users listing. */
router.post('/login', userValidation.validateUserLogin, userController.userLogin);

router.post('/register', userValidation.signUpUser, userController.RegisterNewUser);

router.get('/profile/read', tokenMiddleware.tokenCheck, userController.profileRead);

router.post('/get/all', tokenMiddleware.adminTokenCheck, userController.getAllUserbyPagination);



module.exports = router;
