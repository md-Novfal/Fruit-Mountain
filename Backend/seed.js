const { isEmpty } = require('lodash');
const addAdmin = require('./src/models/user.model');
const log = require('./src/staticService/logger').LOG;
var adminData = require('./src/config/admin.json').Admin;

async function adminDetails() {
    try {
        for (let i = 0; i < adminData.length; i++) {
            addAdmin.create(adminData[i]).then((data) => {
                log.info("admin Added Successfully");
            }).
                catch((err) => {
                    throw err;
                });

        }
    } catch (error) {
        return log.info('admin Data::Unable to check the seed::admin data');

    }
}




module.exports = {
    adminDetails
}