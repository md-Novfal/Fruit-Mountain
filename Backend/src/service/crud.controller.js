const importedModal = require('./Modelimporter');
var log = require('../staticService/logger').LOG;
const responseStructure = require('../staticService/responseResponse');
const { isEmpty } = require('lodash');

const createRequests = async (req) => {
    try {
        const dbName = req.dbName;
        const collection_name = await importedModal(dbName);
        const createData = req.insertdata;
        const createReqApi = new collection_name(createData);
        if (createData.length > 0) {
            const create = await collection_name.insertMany(createData).then((result, error) => {
                if (error) {
                    return (errorInitiateToken = {
                        status: 401,
                        value: `PF::Error while performing insert many`,
                    });
                } else {
                    return { status: 200, value: result };
                }
            });
        } else if (createData.length == undefined) {
            const create = await createReqApi.save().then((result, error) => {
                if (error) {
                    return (errorInitiateToken = {
                        status: 401,
                        value: `PF::Error while creating data`,
                    });
                } else {
                    return { status: 200, value: result };
                }
            });
        }
    } catch (error) {
        errorInitiateToken = {
            status: 401,
            value: `PF::unable to process the request`,
        };
        log.error(errorInitiateToken);
        return errorInitiateToken;
    }
};

const readOneRequests = async (req) => {
    let responseMessage;
    try {
        const collection_name = await importedModal(req.dbName);
        const searchKey = req.searchData;
        const getData = await collection_name.find(searchKey);
        if (isEmpty(getData)) {
            return (errorInitiateToken = {
                status: 401,
                value: `PF::Error while creating data`,
            });
        } else {
            return { status: 200, value: getData };
        }
    } catch (error) {
        return (errorInitiateToken = {
            status: 401,
            value: `PF::Error while creating data`,
        });
    }
};

const updateRequests = async (req, res) => {
    let responseMessage;
    try {
        const dbName = req.dbName;
        const collection_name = await importedModal(dbName);
        const id = req.RequetId;
        const updateData = req.updatedata;
        const updateById = await collection_name.findByIdAndUpdate(id, updateData).then((result, error) => {
            if (error) {
                return (errorInitiateToken = {
                    status: 401,
                    value: `PF::Error while creating data`,
                });
            } else {
                return { status: 200, value: result };
            }
        });
    } catch (error) {
        return (errorInitiateToken = {
            status: 401,
            value: `PF::Error while creating data`,
        });
    }
};

const deleteRequests = async (req, res) => {
    let responseMessage;
    try {
        const dbName = req.dbName;
        const collection_name = await importedModal(dbName);
        const id = req.RequetId;
        const deleteData = req.deletedata;
        if (deleteData == undefined) {
            collection_name.remove(id, function (err, result) {
                if (err) {
                    return (errorInitiateToken = {
                        status: 401,
                        value: `PF::Error while delete data`,
                    });
                } else {
                    return { status: 200, value: result };

                }
            });
        } else {
            collection_name.deleteMany(deleteData, function (err, result) {
                if (err) {
                    return (errorInitiateToken = {
                        status: 401,
                        value: `PF::Error while delete many`,
                    });
                } else {
                    responseMessage = responseStructure.successResponse({ value: result });
                    return responseMessage;
                }
            });
        }
    } catch (error) {
        return (errorInitiateToken = {
            status: 401,
            value: `PF::Error while delete data`,
        });
    }
};

const updateManyRequests = async (req, res) => {
    let responseMessage;
    try {
        const dbName = req.dbName;
        const collection_name = await importedModal(dbName);
        const searchKey = req.RequestKey;
        const updateData = req.updatedata;
        const updateManyData = await collection_name.updateMany(searchKey, updateData, { multi: true }).then((result, error) => {
            if (error) {
                return errorInitiateToken = {
                    status: 401,
                    value: `PF::Error while creating data`
                };
            } else {
                return { status: 200, value: result };
            }
        });
        responseMessage = responseStructure.successResponse(updateManyData);
        return responseMessage;
    } catch (error) {
        return errorInitiateToken = {
            status: 401,
            value: `PF::Error in update Many`
        };;
    }
};
const readWithConstraint = async (req, res) => {
    let responseMessage;
    try {
        const collection_name = await importedModal(req.dbName);
        const searchKey = req.RequestKey;
        collection_name.find(searchKey).then((result, error) => {
            if (err) {
                responseMessage = responseStructure.errorResponse('Error in read with constraint');
                return errorInitiateToken = {
                    status: 401,
                    value: `PF::Error in read with constraint`
                };
            } else {
                return { status: 200, value: result };

            }
        });
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in read with constraint');
        return errorInitiateToken = {
            status: 401,
            value: `PF::Error in read with constraint`
        };
    }
};

const readWithSearch = async (req, res) => {
    let responseMessage;
    try {
        const collection_name = await importedModal(req.dbName);
        const searchKey = req.RequestKey;
        const searchData = {};
        searchData.mobileNumber = new RegExp(searchKey.mobileNumber, 'i');
        collection_name.find(searchData, function (err, data) {
            if (err) {
                responseMessage = responseStructure.errorResponse('Error in read with search');
                return errorInitiateToken = {
                    status: 401,
                    value: `PF::Error in read with search`
                };
            } else {
                return { status: 200, value: data };

            }
        });
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in read with search');
        return errorInitiateToken = {
            status: 401,
            value: `PF::Error in read with search`
        };
    }
};

const readWithPagination = async (req, res) => {
    let responseMessage;
    try {
        const collection_name = await importedModal(req.dbName);
        const options = req.requestQuery;
        const sortQuery = req.sortQuery;
        const query = req.searchData;
        options.select = ['mobileNumber', 'email', 'fname', 'lname', 'isAdmin', 'isActive'];
        options.sort = sortQuery;
        if (query) {
            query.mobileNumber = { $regex: new RegExp(query.mobileNumber), $options: 'i' };
        }
        collection_name.paginate(query, options, function (err, data) {
            if (err) {
                responseMessage = responseStructure.errorResponse('Error in read with Pagination');
                return errorInitiateToken = {
                    status: 401,
                    value: `PF::Error in read with Pagination`
                };
            } else {
                return { status: 200, value: result };

            }
        });
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in read with Pagination');
        return errorInitiateToken = {
            status: 401,
            value: `PF::Error in read with search`
        };
    }
};


const staticArrayPush = async (req, res) => {
    let responseMessage;
    try {
        const collection_name = await importedModal(req.dbName);
        const searchKey = req.RequestKey;
        const updateValue = req.updateValue;
        collection_name.findOneAndUpdate(searchKey, { $push: updateValue }, { multi: true }, (err, result) => {
            if (err) {
                responseMessage = responseStructure.errorResponse('Error in static array push');
                return errorInitiateToken = {
                    status: 401,
                    value: `PF::Error in static array push`
                };
            } else {
                return { status: 200, value: result };

            }
        });
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in static array push');
        return errorInitiateToken = {
            status: 401,
            value: `PF::Error in static array push`
        };
    }
};


const getSingleField = async (req, res) => {
    let responseMessage;
    try {
        const collection_name = await importedModal(req.dbName);
        collection_name.find(req.searchData, req.fieldList, (err, result) => {
            if (err) {
                responseMessage = responseStructure.errorResponse('Error in get single field');
                return errorInitiateToken = {
                    status: 401,
                    value: `PF::Error in get single field`
                };
            } else {
                return { status: 200, value: result };
            }
        });
    } catch (error) {
        responseMessage = responseStructure.errorResponse('Error in get single field Service');
        return errorInitiateToken = {
            status: 401,
            value: `PF::Error in get single field`
        };
    }
};



module.exports = {
    getSingleField,
    createRequests,
    readOneRequests,
    updateRequests,
    updateManyRequests,
    deleteRequests,
    readWithConstraint,
    readWithPagination,
    readWithSearch,
    staticArrayPush,
};
