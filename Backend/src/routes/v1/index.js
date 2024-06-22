const express = require('express');
const router = express.Router();


const userRoute = require('./user.router');
const postRoute = require('./post.router');




const defaultRoutes = [{
    path: "/user",
    route: userRoute
},

{
    path: "/post",
    route: postRoute,

}]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;