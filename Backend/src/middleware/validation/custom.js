
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message({
            custom: `"{#label}" must be a valid id`,
        });
    }

    return value;
};


const password = (value, helpers) => {
    if (!value) {
        return helpers.message({
            custom: '"Password" is not allowed to be empty',
        });
    }

    if (value.length < 8) {
        return helpers.message({
            custom: 'Password must be at least 8 characters',
        });
    }

    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message({
            custom: 'Password must contain at least 1 letter and 1 number',
        });
    }

    return value;
};


module.exports = { objectId, password };