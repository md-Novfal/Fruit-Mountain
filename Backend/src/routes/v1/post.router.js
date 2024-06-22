const express = require('express');
const postController = require('../../controller/post.controller');
const tokenMiddleware = require('../../middleware/Authentication/sessionCheck');
const postValidation = require('../../validation/validation');

const router = express.Router();


/* GET users listing. */
router.post('/create', postValidation.createNewPost, tokenMiddleware.tokenCheck, postController.createPost);

router.post('/get/single', postValidation.SinglePostInfo, postController.getSinglePost);

router.post('/get/all', tokenMiddleware.tokenCheck, postController.getAllpost);

router.post('/update', postValidation.updateSinglePostInfo, tokenMiddleware.tokenCheck, postController.updatePost);



module.exports = router;
