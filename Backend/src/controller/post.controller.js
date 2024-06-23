const crudService = require('../service/crud.controller');
const responseStructure = require('../staticService/responseResponse');
const mongoose = require('mongoose')
const createPost = async (req, res) => {
    try {
        var tokenValue = req.extractValue;
        const createNewPost = await crudService.createRequests({
            dbName: 'post',
            insertdata: [
                {
                    name: req.body.name,
                    description: req.body.description,
                    postImage: req.body.postImage,
                    createdBy: tokenValue._id,
                    updatedBy: tokenValue._id,
                    isActive: true,
                },
            ],
        });
        (createNewPost.status === 200
            ? async () => {
                responseMessage = responseStructure.successResponse({
                    message: 'Post created successfully ',
                });
                res.send(responseMessage);
            }
            : async () => {
                responseMessage = responseStructure.warningResponse('pelase try again');
                res.send(responseMessage);
            })();
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in create post. Please try again');
        res.send(responseMessage);
    }
};

const getSinglePost = async (req, res) => {
    try {
        let responseMessage;
        try {
            const getUserInfo = await crudService.findByIDStatic({
                dbName: 'post',
                id: req.body.id,
            });
            (getUserInfo.status === 200
                ? async () => {
                    responseMessage = responseStructure.successResponse(getUserInfo.value);
                    res.send(responseMessage);
                }
                : async () => {
                    responseMessage = responseStructure.errorResponse({
                        message: 'single post not foud',
                    });
                    res.send(responseMessage);
                })();
        } catch (error) {
            responseMessage = responseStructure.errorResponse('Error in post read. Please try again');
            res.send(responseMessage);
        }
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in post post. Please try again');
        res.send(responseMessage);
    }
};

const getAllpost = async (req, res) => {
    let responseMessage;
    try {
        var tokenValue = req.extractValue;
        const pgNumber = parseInt(req.query.pgNumber);
        const pgSize = parseInt(req.query.pgSize);
        const requestQuery = {};
        requestQuery.limit = pgSize;
        requestQuery.offset = pgSize * (pgNumber - 1);
        const sortObject = req.body.sortObject;
        const getAllUser = await crudService.readWithPagination({ dbName: 'post', requestQuery, sortQuery: sortObject, searchData: { createdBy: new mongoose.Types.ObjectId(tokenValue._id) } });
        (pgNumber <= 0 && pgSize === 0
            ? () => {
                responseMessage = responseStructure.errorResponse('invalid page number. It should start only with 1');
                res.send(responseMessage);
            }
            : async () => {
                (getAllUser.status === 200
                    ? async () => {
                        responseMessage = responseStructure.successResponse(getAllUser.value);
                        res.send(responseMessage);
                    }
                    : () => {
                        responseMessage = responseStructure.errorResponse('Error in get all post with Pagination. ');
                        res.send(responseMessage);
                    })();
            })();
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in get post by pagination. Please try again');
        res.send(responseMessage);
    }
};

const updatePost = async (req, res) => {
    let responseMessage;
    try {
        const updateSinglePost = await crudService.updateRequests({ dbName: "post", RequetId: req.body.id, updatedata: req.body.updateObject });
        ((updateSinglePost.status === 200) ? async () => {
            responseMessage = responseStructure.successResponse({ message: "update Success", token: updateSinglePost.value });
            res.send(responseMessage)
        } : () => {
            responseMessage = responseStructure.errorResponse("Error in update  call. Please try again");
            res.send(responseMessage)
        })()
    } catch (error) {
        responseMessage = responseStructure.errorResponse("Error in update. Please try again");
        res.send(responseMessage)
    }
};

module.exports = {
    createPost,
    getSinglePost,
    getAllpost,
    updatePost,
};
