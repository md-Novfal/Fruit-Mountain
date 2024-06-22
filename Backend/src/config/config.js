const Joi = require('joi');
const dotenv = require('dotenv');
const { get, map } = require('lodash');
const path = require('path');

// Load environment variables from .env file
const envFilePath = path.join(__dirname, '../../.env');

dotenv.config({ path: envFilePath });

// Define the schema for the environment variables
const envVarsSchema = Joi.object({
    APP_VERSION: Joi.string().required().description('Application Version'),
    ENCRYPT_AND_DECRYPT_ALOGRITHM: Joi.string().required().description('Encrypt and decrypt algorithm'),
    ENCRYPT_AND_DECRYPT_SALT: Joi.string().required().description('Encrypt and decrypt salt'),
    ENCRYPT_AND_DECRYPT_SECRET: Joi.string().required().description('Encrypt and decrypt secret key'),
    JWT_SECRET_KEY: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access token expire'),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
}).unknown();

// Validate and extract environment variables
const { value: envVars, error } = envVarsSchema.validate(process.env, {
    errors: { label: 'key' },
});

// Throw an error if validation fails
if (error) {
    const errorMessage = map(get(error, 'details'), 'message').join(', ');

    throw new Error(`Config validation error: ${errorMessage}`);
}

// Build the configuration object
const appConfiguration = {
    appVersion: get(envVars, 'APP_VERSION'),
    encryptAndDecrypt: {
        algorithm: get(envVars, 'ENCRYPT_AND_DECRYPT_ALOGRITHM'),
        salt: get(envVars, 'ENCRYPT_AND_DECRYPT_SALT'),
        secret: get(envVars, 'ENCRYPT_AND_DECRYPT_SECRET'),
    },
    env: get(envVars, 'NODE_ENV'),
    jwt: {
        secretKey: get(envVars, 'JWT_SECRET_KEY'),
        accessExpirationMinutes: Number(get(envVars, 'JWT_ACCESS_EXPIRATION_MINUTES')),
    },
    ENV_port: get(envVars, 'ENV_PORT'),
    mongoDB: {
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        },
        url: get(envVars, 'MONGODB_URL'),
    }
};

module.exports = appConfiguration;
