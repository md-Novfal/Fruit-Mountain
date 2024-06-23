const Joi = require('joi');

const createPost = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    postImage: Joi.string().required(),
});

const getSinglePost = Joi.object({
    id: Joi.string().required(),
});


const updateSinglePost = Joi.object({
    id: Joi.string().required(),
    updateObject: Joi.object().required(),
});






module.exports = { createPost, getSinglePost, updateSinglePost };