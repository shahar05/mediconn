"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = require("../DAL/dal");
var doctorBL_1 = require("./doctorBL");
var QuestionBL_1 = require("./QuestionBL");
var PatientBL = /** @class */ (function () {
    function PatientBL() {
        this.doctorBL = new doctorBL_1.DoctorBL();
        this.questionBL = new QuestionBL_1.QuestionBL();
    }
    PatientBL.prototype.getPatient = function (patientId) {
        return new Promise(function (resolve, reject) {
            PatientBL.dal.getPatient(patientId).then(function (res) {
                resolve(res);
            });
        });
    };
    PatientBL.prototype.createPatient = function (patient) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!patient) {
                reject('No patient provided');
                return;
            }
            var regex = /[0-9]{3}-?[0-9]{7}/;
            var phone = patient.phoneNumber.match(regex);
            if (!phone) {
                console.log("phone is not correct");
                reject("phone is not correct");
                return;
            }
            patient.phoneNumber = patient.phoneNumber.replace('-', '');
            var doctorId = patient.creatorID;
            _this.doctorBL.getDoctor(doctorId).then(function (doctor) {
                if (!doctor) {
                    reject('Doctor Does not Found');
                    return;
                }
                var isPatientLanguageExistInDoctor = doctor.languages.includes(patient.language);
                if (!isPatientLanguageExistInDoctor) {
                    reject("Patient language does not match doctor languages, " + doctor.languages);
                    return;
                }
                _this.questionBL.getDefaultQuestions().then(function (questions) {
                    patient.questions = questions;
                    PatientBL.dal.createPatient(patient).then(function (res) {
                        resolve(res);
                    });
                });
            });
        });
    };
    PatientBL.dal = new dal_1.Dal();
    return PatientBL;
}());
exports.PatientBL = PatientBL;
