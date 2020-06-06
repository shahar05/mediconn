"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var doctorBL_1 = require("../BL/doctorBL");
var DoctorApi = /** @class */ (function () {
    function DoctorApi() {
        this.router = express_1.Router();
        this.doctorBL = new doctorBL_1.DoctorBL();
        this.initRoutes();
    }
    DoctorApi.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/doctor/:id/patient', function (req, res) {
            var doctorId = req.param('id');
            _this.doctorBL.getAllDoctorPatients(doctorId).then(function (data) {
                res.send(data);
                return;
            });
        });
        this.router.get('/doctor/current', function (req, res) {
            var request = req;
            var user = request.user;
            _this.doctorBL.getDoctor(user._id).then(function (data) {
                res.send(data);
                return;
            });
        });
        this.router.get('/doctor', function (req, res) {
            _this.doctorBL.getUser().then(function (data) {
                res.send(data);
                return;
            });
        });
    };
    return DoctorApi;
}());
exports.DoctorApi = DoctorApi;
