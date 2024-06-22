
const { uid } = require('uid');
const appConfiguration = require('../config/config')

const successResponse = (responseMessage) => {
    return {
        result: "Success",
        responseObj: {
            responseId: uid(16),
            responseTs: `${Math.floor(Date.now() / 1000)}`,
            responseApiVersion: appConfiguration.appVersion,
            responseCode: 200,
            responseMessage: "successfully done",
            responseDataParams: {
                data: responseMessage
            }
        }
    }
}

const errorResponse = (errorMessage) => {
    return {
        result: "Error",
        responseObj: {
            responseId: uid(16),
            responseTs: `${Math.floor(Date.now() / 1000)}`,
            responseApiVersion: appConfiguration.appVersion,
            responseCode: 401,
            responseMessage: "Error in Process",
            responseDataParams: {
                data: errorMessage
            }
        }
    }
}

const warningResponse = (warningMessage) => {
    return {
        result: "Warning",
        responseObj: {
            responseId: uid(16),
            responseTs: `${Math.floor(Date.now() / 1000)}`,
            responseApiVersion: appConfiguration.appVersion,
            responseCode: 501,
            responseMessage: "Ran with Warnings",
            responseDataParams: {
                data: warningMessage
            }
        }
    }
}

const validationResponse = (validaitonMessage) => {
    return {
        result: "Validaiton",
        responseObj: {
            responseId: uid(16),
            responseTs: `${Math.floor(Date.now() / 1000)}`,
            responseApiVersion: appConfiguration.appVersion,
            responseCode: 601,
            responseMessage: "Error in request format",
            responseDataParams: {
                data: validaitonMessage
            }
        }
    }
}

const sessionResponse = (sessionMessage) => {
    return {
        result: "Session Error",
        responseObj: {
            responseId: uid(16),
            responseTs: `${Math.floor(Date.now() / 1000)}`,
            responseApiVersion: appConfiguration.appVersion,
            responseCode: 701,
            responseMessage: "Session Expored",
            responseDataParams: {
                data: sessionMessage
            }
        }
    }
}

module.exports = {
    successResponse,
    errorResponse,
    warningResponse,
    validationResponse,
    sessionResponse
}
