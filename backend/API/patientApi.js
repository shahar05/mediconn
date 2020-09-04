"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientApi = void 0;
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
        this.router.post('/sms', function (req, res) {
            _this.patientBL.sendSms(req.body.link, req.body.phoneNumber).then(function () {
                res.send();
            }).catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
        });
        this.router.post('/records/:id', function (req, res) {
            console.log(req.body);
            _this.patientBL.getPatientsAnswersByQuestion(req.body, req.params.id)
                .then(function (questionResults) {
                res.send(questionResults);
            }).catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
        });
        this.router.delete('/patient/:id', function (req, res) {
            _this.patientBL.deletePatient(req.params.id).then(function (response) {
                console.log(response);
                res.status(204).send();
            }).catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
        });
        this.router.put('/patient', function (req, res) {
            console.log('Edit patient request started. body:', req.body);
            var patient = req.body;
            _this.patientBL.updatePatient(patient).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                res.status(400).send(err);
            });
        });
        this.router.post('/patient', function (req, res) {
            _this.patientBL.createPatient(req.body).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                res.status(400).send(err);
            });
        });
        this.router.get('/patient/:id', function (req, res) {
            var patientId = req.params.id;
            _this.patientBL.getPatient(patientId).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                res.status(404).send(err);
            });
        });
        this.router.delete('/patient/:id/question/:questionid', function (req, res) {
            var patientId = req.params.id;
            var questionID = req.params.questionid;
            _this.patientBL.deleteQuestionFromPatientArray(patientId, questionID).then(function (msg) {
                res.status(204).send(msg);
            }).catch(function (err) {
                res.status(403).send(err);
            });
        });
        this.router.post('/patient/:id/question', function (req, res) {
            var request = req;
            var doctor = request.user;
            var patientId = req.params.id;
            console.log(req.body);
            _this.patientBL.setQuestionToPatient(patientId, doctor._id, req.body).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                res.status(400).send(err);
            });
        });
    };
    return PatientApi;
}());
exports.PatientApi = PatientApi;
