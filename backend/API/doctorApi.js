"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorApi = void 0;
var express_1 = require("express");
var doctorBL_1 = require("../BL/doctorBL");
var adminBL_1 = require("../BL/adminBL");
var DoctorApi = /** @class */ (function () {
    function DoctorApi() {
        this.router = express_1.Router();
        this.doctorBL = new doctorBL_1.DoctorBL();
        this.adminBL = new adminBL_1.AdminBL();
        this.initRoutes();
    }
    DoctorApi.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/doctor/:id/patient', function (req, res) {
            //let doctorId = <any>req.params.id;
            var doctorId = req.params.id;
            _this.doctorBL.getAllDoctorPatients(doctorId).then(function (data) {
                res.send(data);
                return;
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(400).send(err);
            });
        });
        //TODO: if is admin login then dont lookup for doctor
        this.router.get('/doctor/current', function (req, res) {
            var request = req;
            var user = request.user;
            console.log(request.user);
            _this.doctorBL.getDoctor(user._id).then(function (data) {
                res.send(data);
                return;
            }).catch(function (err) {
                _this.adminBL.getAdmin(request.user._id)
                    .then(function (admin) {
                    return res.send(admin);
                }).catch(function (err) {
                    return res.status(401).send(err);
                });
            });
        });
        this.router.get('/doctor', function (req, res) {
            _this.doctorBL.getUser().then(function (data) {
                res.send(data);
                return;
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    return DoctorApi;
}());
exports.DoctorApi = DoctorApi;
