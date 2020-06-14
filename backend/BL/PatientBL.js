"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = require("../DAL/dal");
var doctorBL_1 = require("./doctorBL");
var QuestionBL_1 = require("./QuestionBL");
var enums_1 = require("../enums");
var PatientBL = /** @class */ (function () {
    function PatientBL() {
        this.doctorBL = new doctorBL_1.DoctorBL();
        this.questionBL = new QuestionBL_1.QuestionBL();
    }
    PatientBL.prototype.getPatient = function (patientId) {
        return new Promise(function (resolve, reject) {
            PatientBL.dal.getPatient(patientId).then(function (res) {
                resolve(res);
            }).catch(function (err) { reject(err); });
        });
    };
    PatientBL.prototype.deletePatient = function (id) {
        return new Promise(function (resolve, reject) {
            PatientBL.dal.deletePatient(id).then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    PatientBL.prototype.deleteQuestionFromPatientArray = function (patientId, questionID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getPatient(patientId).then(function (foundPatient) {
                var i = foundPatient.questions.findIndex(function (quest) { return quest._id.equals(questionID); });
                if (i == -1) {
                    console.log("Not found Question in the array");
                    reject("Not found Question in the array");
                }
                else {
                    foundPatient.questions.splice(i, 1);
                    foundPatient.save();
                    console.log("Deleted Successfully");
                    resolve("Deleted Successfully");
                }
            });
        });
    };
    PatientBL.prototype.setQuestionToPatient = function (patientId, doctorID, question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (question.isDefault === true) {
                console.log("Question should not be default");
                reject("Question should be default");
            }
            if (doctorID !== question.creatorID) {
                console.log("CreatorID Not equal to DoctorID");
                reject("CreatorID Not equal to DoctorID");
            }
            if (enums_1.QuestionType.Quantity === question.questionType && (!question.min || !question.max)) {
                console.log("Question with type Quantity Must Have min and max values");
                reject("Question with type Quantity Must Have min and max values");
            }
            else {
                delete question.min;
                delete question.max;
            }
            _this.getPatient(patientId).then(function (foundPatient) {
                if (!_this.questionContainsPatientLanguage(foundPatient, question.textArr)) {
                    console.log("patient can hava question text of his language only");
                    reject("patient can hava question text of his language only");
                }
                _this.questionBL.setNewQuestion(question).then(function (newQuestion) {
                    foundPatient.questions.push(newQuestion);
                    foundPatient.save();
                    resolve(newQuestion);
                }).catch(function () {
                    reject("Unable to create Question");
                });
            }).catch(function () {
                console.log("Patient Not found");
                reject("Patient Not found");
            });
        });
    };
    PatientBL.prototype.questionContainsPatientLanguage = function (patient, txtArr) {
        for (var index = 0; index < txtArr.length; index++) {
            var element = txtArr[index];
            if (element.language === patient.language)
                return true;
        }
        return false;
    };
    PatientBL.prototype.updatePatient = function (patient) {
        return new Promise(function (resolve, reject) {
            PatientBL.dal.getDoctor(patient.creatorID).then(function (doctor) {
                PatientBL.dal.updatePatient(patient).then(function (patient) {
                    resolve(patient);
                    return;
                }).catch(function (err) {
                    reject(err);
                    return;
                });
            }).catch(function (err) {
                console.error(err);
                reject(err);
                return;
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
                _this.questionBL.getDefaultQuestionsByID(patient.creatorID).then(function (questions) {
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
