const Joi = require('joi');

const userSingUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobileNumber: Joi.string(),
  name: Joi.object({
    first: Joi.string(),
    last: Joi.string()
  }).required()
});

const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


const updateUser = Joi.object({
  email: Joi.string().email().required(),
  updateObject: Joi.object().required(),
});






module.exports = { userLogin, updateUser, userSingUpSchema };