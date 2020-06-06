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
        this.router.post('/medical-additions', function (req, res) {
            console.log('create medical-additions started', req.body.medicalAddition);
            _this.medicalAdditionsBL.createMedicalAddition(req.body.medicalAddition).then(function (data) {
                console.log('123123123123123123123');
                res.send(data);
            });
        });
    };
    return MedicalAdditionsApi;
}());
exports.MedicalAdditionsApi = MedicalAdditionsApi;
