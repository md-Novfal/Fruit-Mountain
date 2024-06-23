const express = require('express');
const mongoose = require('mongoose');
const log = require('./src/staticService/logger').LOG;
const indexRouter = require('./src/routes/v1/index');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const appConfiguration = require('./src/config/config')
const fileupload = require("express-fileupload");
const seed = require('./seed');


// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50000mb", extended: true, parameterLimit: 5002633 }));
app.use(bodyParser.urlencoded({ limit: "50000mb", extended: true, parameterLimit: 5002633 }));
app.use(fileupload());

// Set up routes
app.use('/v1', indexRouter);

// Error handling
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// Connect to MongoDB
mongoose
    .connect(appConfiguration.mongoDB.url, appConfiguration.mongoDB.options)
    .then(async () => {
        seed.adminDetails();
        log.info('Successfully connected to MongoDB.');
    })
    .catch((err) => {
        log.error('Connection error', err);
        process.exit();
    });

// Listen for requests
app.listen(appConfiguration.ENV_port, () => {
    log.info(`Server is listening on port ${appConfiguration.ENV_port}`);
});

