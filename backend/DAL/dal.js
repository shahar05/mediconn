"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DoctorModel_1 = require("./../Models/DoctorModel");
var mongoose_1 = __importDefault(require("mongoose"));
var AdminModel_1 = require("../Models/AdminModel");
var PatientModel_1 = require("../Models/PatientModel");
var QuestionModel_1 = require("../Models/QuestionModel");
var MedicalAdditionsModel_1 = require("../Models/MedicalAdditionsModel");
var env = require('../env.json');
var Dal = /** @class */ (function () {
    function Dal() {
        //Schemas
        this.doctorSchema = mongoose_1.default.model('Doctor', DoctorModel_1.DoctorSchema);
        this.adminSchema = mongoose_1.default.model('Admin', AdminModel_1.AdminSchema);
        this.patientSchema = mongoose_1.default.model('Patient', PatientModel_1.PatientSchema);
        this.questionSchema = mongoose_1.default.model('question', QuestionModel_1.QuestionSchema);
        this.medicalAdditionsSchema = mongoose_1.default.model('MedicalAdditions', MedicalAdditionsModel_1.MedicalAdditionsSchema);
        mongoose_1.default.connect(env.mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true }).then(function (mongoose) {
            mongoose.set('useCreateIndex', true);
        });
    }
    Dal.prototype.createMedicalAdditions = function (medicalAdditions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.medicalAdditionsSchema.create(medicalAdditions, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.updateMedicationsOrTreatmentsToPatient = function (medicalAddition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            var propertyName = medicalAddition.additionType === 0 ? 'medications' : 'treatments';
            _this.patientSchema.findOneAndUpdate({ _id: medicalAddition.patientId }, { $push: (_a = {}, _a[propertyName] = medicalAddition._id, _a) }, function (err, doc) {
                if (err) {
                    console.log('updateMedicationsOrTreatmentsToPatient', err);
                    reject();
                }
                resolve(medicalAddition);
            });
        });
    };
    Dal.prototype.getPatientQuestions = function (patientId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.questionSchema.find({ isDefault: true }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.getDefaultQuestions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.questionSchema.find({ isDefault: true }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.setDefaultQuestions = function (question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.questionSchema.create(question, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.createPatient = function (patient) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.patientSchema.create(patient, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.getPatient = function (patientId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.patientSchema.findOne({ _id: patientId }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            }).populate("questions").populate("treatments").populate("medications");
        });
    };
    Dal.prototype.getAllDoctorPatients = function (doctorId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.patientSchema.find({ creatorID: doctorId }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.getDoctors = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.doctorSchema.find(function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.getDoctor = function (doctorId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.doctorSchema.findOne({ _id: doctorId }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.getDoctorByLogin = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.doctorSchema.findOne({
                username: username,
                password: password
            }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    Dal.prototype.getAdminByLogin = function (username, password, hospitalName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.adminSchema.findOne({
                username: username,
                hospitalName: hospitalName,
                password: password
            }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    };
    return Dal;
}());
exports.Dal = Dal;
