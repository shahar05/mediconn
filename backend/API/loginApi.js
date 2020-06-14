"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var doctorBL_1 = require("../BL/doctorBL");
var adminBL_1 = require("../BL/adminBL");
var authenticationHelper_1 = require("../Helpers/authenticationHelper");
var LoginApi = /** @class */ (function () {
    function LoginApi() {
        this.adminBL = new adminBL_1.AdminBL();
        this.doctorBL = new doctorBL_1.DoctorBL();
        this.router = express_1.Router();
        this.initRoutes();
    }
    LoginApi.prototype.createToken = function (obj) {
        return authenticationHelper_1.Authenticate.createToken(obj);
    };
    LoginApi.prototype.loginAdmin = function (req, res) {
        var _this = this;
        this.adminBL.login(req.body).then(function (admin) {
            res.send({ token: _this.createToken(admin), isLogin: true, type: "admin", object: admin });
        }).catch(function (err) {
            res.status(401).send({ isLogin: false, response: "admin not found" });
        });
    };
    LoginApi.prototype.loginDoctor = function (req, res) {
        var _this = this;
        this.doctorBL.login(req.body).then(function (doctor) {
            res.send({ token: _this.createToken(doctor), isLogin: true, type: "doctor", object: doctor });
        }).catch(function (err) {
            res.status(401).send({ isLogin: false, response: "doctor not found" });
        });
    };
    LoginApi.prototype.initRoutes = function () {
        var _this = this;
        this.router.post('/login', function (req, res) {
            if (req.body.user === 'admin') {
                _this.loginAdmin(req, res);
            }
            else if (req.body.user === "doctor") {
                _this.loginDoctor(req, res);
            }
            else {
                res.status(400).send({ isLogin: false, response: "Type of Request is Missing" });
            }
        });
    };
    return LoginApi;
}());
exports.LoginApi = LoginApi;
