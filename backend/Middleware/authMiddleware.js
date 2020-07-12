"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var authenticationHelper_1 = require("../Helpers/authenticationHelper");
exports.authMiddleware = function (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var userToken = req.headers.authorization.split(' ')[1];
        authenticationHelper_1.Authenticate.deserializeObject(userToken).then(function (res) {
            req['user'] = res.user;
            next();
            return;
        }).catch(function () {
            res.send(401);
        });
    }
    else {
        res.send(401);
    }
};
