const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { assign } = require('lodash');
const mongoosePaginate = require('mongoose-paginate-v2');

// const { setupAggregate, setupPopulate, toJSON } = require('./plugins');

const userSchema = new mongoose.Schema(
    {
        name: {
            first: {
                type: String,
            },
            last: {
                type: String,
            },
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true

        },
        password: {
            type: String,
            trim: true,
            minlength: 8,
            validate(value) {
                if (
                    !value.match(/\d/g) ||
                    !value.match(/[a-z]/g) ||
                    !value.match(/[A-Z]/g) ||
                    !value.match(/[!"#$%&'()*+.:;<=>?@^_`{|}~-]/g)
                ) {
                    throw new Error('Password must contain at least one upper and lower letter, one number and one special character');
                }
            },
            required: true,

            private: true, // used by the toJSON plugin
        },

        mobileNumber: {
            type: String,
            required: true

        },
        isAdmin: {
            type: Boolean,
            required: true

        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: String,
        },
        updatedBy: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);



// Check if email is taken
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = this;

    const query = { email };

    if (excludeUserId) {
        assign(query, { _id: { $ne: excludeUserId } });
    }

    const userInfo = await user.findOne(query);

    return !!userInfo;
};
userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', userSchema);
