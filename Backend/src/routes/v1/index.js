const express = require('express');
const router = express.Router();


const userRoute = require('./user.router');



const defaultRoutes = [{
    path: "/user",
    route: userRoute,

}]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;