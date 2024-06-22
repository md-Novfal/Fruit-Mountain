const Joi = require('joi');
const responseStructure = require('../staticService/responseResponse')

// Define your Joi schemas
const { userLoginSchema, updateUser } = require('../middleware/validation/user.joi');

// Middleware function to validate request bodies against Joi schemas
const validateUserLogin = async (request, response, next) => {
  try {
    await userLoginSchema.validateAsync(request.body);
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






module.exports = {
  validateUserLogin,
  updateSingleUser
};
