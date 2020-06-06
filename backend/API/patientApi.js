"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PatientBL_1 = require("../BL/PatientBL");
var PatientApi = /** @class */ (function () {
    function PatientApi() {
        this.router = express_1.Router();
        this.patientBL = new PatientBL_1.PatientBL();
        this.initRoutes();
    }
    PatientApi.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/patient/:id', function (req, res) {
            var patientId = req.param('id');
            _this.patientBL.getPatient(patientId).then(function (data) {
                res.send(data);
            });
        });
        this.router.post('/patient', function (req, res) {
            console.log('Create patient request started. body:', req.body);
            _this.patientBL.createPatient(req.body).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                res.status(400).send(err);
            });
        });
    };
    return PatientApi;
}());
exports.PatientApi = PatientApi;
