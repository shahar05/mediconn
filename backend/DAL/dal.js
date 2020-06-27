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
var enums_1 = require("../enums");
var env = require('../env.json');
var Dal = /** @class */ (function () {
    function Dal() {
        //Schemas
        this.doctorSchema = mongoose_1.default.model('Doctor', DoctorModel_1.DoctorSchema);
        this.adminSchema = mongoose_1.default.model('Admin', AdminModel_1.AdminSchema);
        this.patientSchema = mongoose_1.default.model('Patient', PatientModel_1.PatientSchema);
        this.questionSchema = mongoose_1.default.model('question', QuestionModel_1.QuestionSchema);
        this.medicalAdditionsSchema = mongoose_1.default.model('MedicalAdditions', MedicalAdditionsModel_1.MedicalAdditionsSchema);
        mongoose_1.default.connect(env.mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(function (mongoose) {
            mongoose.set('useCreateIndex', true);
        });
    }
    Dal.prototype.updateDoctor = function (doctor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getDoctor(doctor._id).then(function (foundedDoctor) {
                foundedDoctor.department = doctor.department;
                foundedDoctor.password = doctor.password;
                foundedDoctor.firstName = doctor.firstName;
                foundedDoctor.phoneNumber = doctor.phoneNumber;
                foundedDoctor.lastName = doctor.lastName;
                foundedDoctor.username = doctor.username;
                foundedDoctor.save().then(function (updatedDoctor) {
                    resolve(updatedDoctor);
                }).catch(function (err) {
                    console.log("Cant updatded");
                    console.log(err);
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    Dal.prototype.deleteDoctor = function (doctorID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.doctorSchema.findByIdAndDelete(doctorID, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    Dal.prototype.findAdminByID = function (adminID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.adminSchema.findById(adminID, function (err, foundedAdmin) {
                if (err || !foundedAdmin) {
                    reject(err);
                    return;
                }
                resolve(foundedAdmin);
            });
        });
    };
    Dal.prototype.updatePatient = function (patient) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getPatient(patient._id).then(function (foundedPatient) {
                foundedPatient.firstName = patient.firstName;
                foundedPatient.lastName = patient.lastName;
                foundedPatient.phoneNumber = patient.phoneNumber;
                foundedPatient.endHour = patient.endHour;
                foundedPatient.startHour = patient.startHour;
                foundedPatient.save();
                resolve(foundedPatient);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    Dal.prototype.deletePatient = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.patientSchema.findByIdAndDelete(id, function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve("Delete Successfully");
                }
            });
        });
    };
    Dal.prototype.updateQuestion = function (question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.questionSchema.findById(question._id, function (err, foundedQuestion) {
                if (err || !foundedQuestion) {
                    console.log(err);
                    console.log("Question Try to update but didnt found");
                    reject(err);
                    return;
                }
                foundedQuestion.questionType = question.questionType;
                if (foundedQuestion.questionType === enums_1.QuestionType.Quantity) {
                    if ((!question.min || !question.max)) {
                        console.log("Question with type Quantity Must Have min and max values");
                        reject("Question with type Quantity Must Have min and max values");
                        return;
                    }
                    else {
                        foundedQuestion.min = question.min;
                        foundedQuestion.max = question.max;
                    }
                }
                else {
                    delete question.min;
                    delete question.max;
                }
                question.textArr.forEach(function (questionTextOld) {
                    foundedQuestion.textArr.forEach(function (questionTextNew) {
                        if (questionTextOld.language === questionTextNew.language) {
                            questionTextNew.text = questionTextOld.text;
                        }
                    });
                });
                foundedQuestion.save();
                console.log(foundedQuestion);
                resolve(foundedQuestion);
            });
        });
    };
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
    Dal.prototype.findQuestionByID = function (questionID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.questionSchema
                .findById(questionID, function (err, foundedQuestion) {
                if (err || !foundedQuestion) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(foundedQuestion);
            });
        });
    };
    Dal.prototype.getDefaultQuestionsByID = function (doctorID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.questionSchema.find({ isDefault: true, creatorID: doctorID }, function (err, res) {
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
    Dal.prototype.createNewQuestion = function (question) {
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
    Dal.prototype.createDoctor = function (doctor) {
        var _this = this;
        delete doctor._id;
        return new Promise(function (resolve, reject) {
            _this.doctorSchema.create(doctor, function (err, res) {
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
                if (err || !res) {
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
    Dal.prototype.getDoctorsByAdminID = function (adminID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.doctorSchema.find({ creatorID: adminID }, function (err, doctors) {
                if (err || !doctors || !doctors.length) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(doctors);
            });
        });
    };
    Dal.prototype.getDoctor = function (doctorId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.doctorSchema.findById(doctorId, function (err, foundedDoctor) {
                if (err || !foundedDoctor) {
                    reject("Doctor Not Found");
                    return;
                }
                resolve(foundedDoctor);
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
    Dal.prototype.getAdminByLogin = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.adminSchema.findOne({
                username: username,
                password: password
            }, function (err, admin) {
                if (err || !admin) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(admin);
            });
        });
    };
    // name: string;
    // description: string;
    // creatorId?: string;
    // patientId?: string;
    // additionType: AddPopupType;
    Dal.prototype.updateMedical = function (med) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.medicalAdditionsSchema.findById(med._id, function (err, foundedMedical) {
                if (err || !foundedMedical) {
                    reject(err);
                    return;
                }
                foundedMedical.name = med.name;
                foundedMedical.description = med.description;
                foundedMedical.save();
                resolve(foundedMedical);
            });
        });
    };
    Dal.prototype.deleteMedical = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.medicalAdditionsSchema.findByIdAndDelete(id, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    };
    return Dal;
}());
exports.Dal = Dal;
