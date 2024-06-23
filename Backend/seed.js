const { isEmpty } = require('lodash');
const addAdmin = require('./src/models/user.model');
const log = require('./src/staticService/logger').LOG;
var adminData = require('./src/config/admin.json').Admin;

async function adminDetails() {
    try {
        for (let i = 0; i < adminData.length; i++) {
            const addTeams = await addAdmin.find({ "email": adminData[i].email, isActive: true });
            (isEmpty(addTeams) ? async () => {
                addAdmin.create(adminData[i]).
                    then((data) => {
                        log.info("Admin Added Successfully");
                    }).
                    catch((err) => {
                        throw err;
                    });

            } : () => {
                return log.info('Admin::Admin  details  Already Exist');
            })()
        }
    } catch (error) {
        return log.info('Admin::Unable to check the seed');

    }
}




module.exports = {
    adminDetails
}