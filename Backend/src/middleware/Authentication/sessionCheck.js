const jwt = require("jsonwebtoken");
const appConfiguration = require("../../config/config");
const responseStructure = require('../../staticService/responseResponse');

const tokenCheck = async (req, res, next) => {
    try {
        const decodeuse = jwt.verify(req.headers["token"], appConfiguration.jwt.secretKey);
        req.extractValue = decodeuse.value[0];
        next();
    } catch (error) {
        const responseMessage = responseStructure.sessionResponse("token not verified!")
        res.send(responseMessage)
    }
};

const tokenExtract = async (req, res) => {
    const token = req.headers['token'];
    try {
        const getData = await tokendecode(token, appConfiguration.jwt.secretKey);
        const responseMessage = responseStructure.sessionResponse(getData)
        res.send(responseMessage)
    } catch (error) {
        const responseMessage = responseStructure.sessionResponse("Not a valid token")
        res.send(responseMessage)
    }
}

const tokendecode = (token, secret) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}


const adminTokenCheck = async (req, res, next) => {
    let responseMessage;
    try {
        const decodeuse = jwt.verify(req.headers["token"], appConfiguration.jwt.secretKey);
        (decodeuse.value[0].isAdmin == true ? async () => {
            req.extractValue = decodeuse.value[0];
            next();
        } : async () => {
            responseMessage = responseStructure.warningResponse("You are not authorised for the user!")
            res.send(responseMessage)
        })();
    } catch (error) {
        responseMessage = responseStructure.sessionResponse("token not verified!")
        res.send(responseMessage)
    }
}

module.exports = {
    tokenCheck,
    tokenExtract,
    adminTokenCheck
};