"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var MedicalAdditionsBL_1 = require("../BL/MedicalAdditionsBL");
var MedicalAdditionsApi = /** @class */ (function () {
    function MedicalAdditionsApi() {
        this.router = express_1.Router();
        this.medicalAdditionsBL = new MedicalAdditionsBL_1.MedicalAdditionsBL();
        this.initRoutes();
    }
    MedicalAdditionsApi.prototype.initRoutes = function () {
        var _this = this;
        this.router.put('/medical-additions', function (req, res) {
            _this.medicalAdditionsBL.updateMedical(req.body).then(function (med) {
                res.send(med);
            }).catch(function (err) {
                res.status(400).send(err);
            });
        });
        this.router.delete('/medical-additions/:id', function (req, res) {
            _this.medicalAdditionsBL.deleteMedical(req.params.id).then(function () {
                res.status(204).send();
            }).catch(function (err) {
                res.status(400).send(err);
            });
        });
        this.router.post('/medical-additions', function (req, res) {
            console.log('create medical-additions started', req.body.medicalAddition);
            _this.medicalAdditionsBL.createMedicalAddition(req.body.medicalAddition).then(function (data) {
                console.log("Medical Addition Created");
                res.status(201).send(data);
            });
        });
    };
    return MedicalAdditionsApi;
}());
exports.MedicalAdditionsApi = MedicalAdditionsApi;
