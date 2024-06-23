const crudService = require('../service/crud.controller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const responseStructure = require('../staticService/responseResponse');
const { isEmpty } = require('lodash');
const appConfiguration = require('../config/config');

const userLogin = async (req, res) => {
    let responseMessage;
    try {
        const getUserLoginInfo = await crudService.readOneRequests({
            dbName: 'user',
            searchData: { email: req.body.email, isActive: true },
        });
        (getUserLoginInfo.status === 200
            ? async () => {
                const isPaswwordTrue = await bcrypt.compare(req.body.password, getUserLoginInfo.value[0].password);
                (isPaswwordTrue
                    ? async () => {
                        const authToken = jwt.sign({ value: getUserLoginInfo.value[0] }, appConfiguration.jwt.secretKey, { expiresIn: appConfiguration.jwt.accessExpirationMinutes });
                        responseMessage = responseStructure.successResponse({
                            token: authToken,
                            isAdmin: getUserLoginInfo.value[0].isAdmin,
                            value: getUserLoginInfo.value[0]
                        });
                        res.send(responseMessage);
                    }
                    : async () => {
                        responseMessage = responseStructure.warningResponse({
                            message: 'Incorrect password',
                        });
                        res.send(responseMessage);
                    })();
            }
            : async () => {
                responseMessage = responseStructure.warningResponse({
                    message: 'please sign up continue',
                });
                res.send(responseMessage);
            })();
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in signin. Please try again');
        res.send(responseMessage);

    }
};

const RegisterNewUser = async (req, res) => {
    let responseMessage;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const createUserInfo = await crudService.createRequests({
            dbName: 'user',
            insertdata: [
                {
                    email: req.body.email,
                    password: hashedPassword,
                    mobileNumber: req.body.mobileNumber,
                    isAdmin: false,
                    name: req.body.name,
                    isActive: true,
                    createdAt: Date.now(),
                    createdBy: '',
                    updatedAt: Date.now(),
                    updatedBy: '',
                },
            ],
        });
        (createUserInfo.status === 200
            ? async () => {
                const authToken = jwt.sign({ value: createUserInfo.value }, appConfiguration.jwt.secretKey, { expiresIn: appConfiguration.jwt.accessExpirationMinutes });
                responseMessage = responseStructure.successResponse({
                    message: 'User created successfully ',
                    token: authToken,
                    value: createUserInfo.value[0],
                    isAdmin: createUserInfo.value[0].isAdmin,

                });
                res.send(responseMessage);
            }
            : async () => {
                responseMessage = responseStructure.warningResponse({ message: "Email already exisit" });
                res.send(responseMessage);
            })();
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in sign up. Please try again');
        res.send(responseMessage);

    }
};

const profileRead = async (req, res) => {
    let responseMessage;
    try {
        const getUserInfo = await crudService.readOneRequests({
            dbName: 'user',
            searchData: { email: req.body.email, isActive: true },
        });
        (getUserInfo.status === 200
            ? async () => {
                responseMessage = responseStructure.successResponse(getUserInfo.value[0]);
                res.send(responseMessage);
            }
            : async () => {
                responseMessage = responseStructure.errorResponse({
                    message: 'user info not foud',
                });
                res.send(responseMessage);
            })();
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in profile read. Please try again');
        res.send(responseMessage);
    }
};

const getAllUserbyPagination = async (req, res) => {
    let responseMessage;
    try {
        const pgNumber = parseInt(req.query.pgNumber)
        const pgSize = parseInt(req.query.pgSize)
        const requestQuery = {}
        requestQuery.limit = pgSize
        requestQuery.offset = pgSize * (pgNumber - 1)
        const sortObject = req.body.sortObject;
        const getAllUser = await crudService.readWithPagination({ dbName: "user", requestQuery, sortQuery: sortObject });
        ((pgNumber <= 0 && pgSize === 0) ? () => {
            responseMessage = responseStructure.errorResponse("invalid page number. It should start only with 1");
            res.send(responseMessage)
        } : async () => {
            (getAllUser.status === 200 ? async () => {
                responseMessage = responseStructure.successResponse(getAllUser.value)
                res.send(responseMessage)
            } : () => {
                responseMessage = responseStructure.errorResponse("Error in getAllUser with Pagination. ");
                res.send(responseMessage)
            })()
        })()
    } catch (error) {
        responseMessage = responseStructure.errorResponse("Error in get user by pagination. Please try again");
        res.send(responseMessage);
    }
}

module.exports = {
    userLogin,
    RegisterNewUser,
    profileRead,
    getAllUserbyPagination
};
