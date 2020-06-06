"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authenticate = require("../AuthenticationHandler/Authentication");
var express = require("express");
var Doctor = require("../models/doctor");
var Admin = require("../models/admin");
var router = express.Router();
router.post('/login', function (req, res) {
    if (req.body.user === "admin") {
        delete req.body.user;
        Admin.findOne(req.body, function (err, foundedAdmin) {
            if (err || !foundedAdmin) {
                console.log(err);
                res.status(404).send({ isLogin: false, response: "doctor not found" });
            }
            else {
                var token = Authenticate.createToken({
                    username: foundedAdmin.username,
                    password: foundedAdmin.password,
                    _id: foundedAdmin._id
                });
                res.send({ token: token, isLogin: true, type: "admin", object: foundedAdmin });
            }
        });
    }
    else if (req.body.user === "doctor") {
        delete req.body.user;
        Doctor.findOne(req.body, function (err, foundedDoctor) {
            if (err || !foundedDoctor) {
                console.log(err);
                res.status(404).send({ isLogin: false, response: "doctor not found" });
            }
            else {
                var token = Authenticate.createToken({
                    username: foundedDoctor.username,
                    password: foundedDoctor.password,
                    _id: foundedDoctor._id
                });
                res.send({ token: token, isLogin: true, type: "doctor", object: foundedDoctor });
            }
        });
    }
    else {
        res.status(400).send({ isLogin: false, response: "Type of Request is Missing" });
    }
});
exports.default = router;
// module.exports = router;
