const Joi = require('joi');
const responseStructure = require('../staticService/responseResponse')

// Define your Joi schemas
const { updateUser, userLogin, userSingUpSchema } = require('../middleware/validation/user.joi');
const { createPost, getSinglePost, updateSinglePost } = require('../middleware/validation/post.joi');

// Middleware function to validate request bodies against Joi schemas
const validateUserLogin = async (request, response, next) => {
  try {
    await userLogin.validateAsync(request.body);
    next();
  } catch (err) {
    let responseMessage = await responseStructure.validationResponse(err)
    response.send(responseMessage)
  }
}

const updateSingleUser = async (request, response, next) => {
  try {
    await updateUser.validateAsync(request.body);
    next();
  } catch (err) {
    let responseMessage = await responseStructure.validationResponse(err)
    response.send(responseMessage)
  }
}

const signUpUser = async (request, response, next) => {
  try {
    await userSingUpSchema.validateAsync(request.body);
    next();
  } catch (err) {
    let responseMessage = await responseStructure.validationResponse(err)
    response.send(responseMessage)
  }
}

const createNewPost = async (request, response, next) => {
  try {
    await createPost.validateAsync(request.body);
    next();
  } catch (err) {
    let responseMessage = await responseStructure.validationResponse(err)
    response.send(responseMessage)
  }
}

const updateSinglePostInfo = async (request, response, next) => {
  try {
    await updateSinglePost.validateAsync(request.body);
    next();
  } catch (err) {
    let responseMessage = await responseStructure.validationResponse(err)
    response.send(responseMessage)
  }
}

const SinglePostInfo = async (request, response, next) => {
  try {
    await getSinglePost.validateAsync(request.body);
    next();
  } catch (err) {
    let responseMessage = await responseStructure.validationResponse(err)
    response.send(responseMessage)
  }
}








module.exports = {
  validateUserLogin,
  updateSingleUser,
  signUpUser,
  createNewPost,
  updateSinglePostInfo,
  SinglePostInfo
};
