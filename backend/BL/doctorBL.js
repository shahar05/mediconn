"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = require("../DAL/dal");
var DoctorBL = /** @class */ (function () {
    function DoctorBL() {
    }
    DoctorBL.prototype.getUser = function () {
        return new Promise(function (resolve, reject) {
            DoctorBL.dal.getDoctors().then(function (res) {
                resolve(res);
            });
        });
    };
    DoctorBL.prototype.getDoctor = function (doctorId) {
        return new Promise(function (resolve, reject) {
            DoctorBL.dal.getDoctor(doctorId).then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    DoctorBL.prototype.getAllDoctorPatients = function (doctorId) {
        return new Promise(function (resolve, reject) {
            DoctorBL.dal.getAllDoctorPatients(doctorId).then(function (res) {
                resolve(res);
            });
        });
    };
    DoctorBL.prototype.login = function (doctor) {
        return new Promise(function (resolve, reject) {
            DoctorBL.dal.getDoctorByLogin(doctor.username, doctor.password).then(function (res) {
                resolve(res);
            });
        });
    };
    DoctorBL.dal = new dal_1.Dal();
    return DoctorBL;
}());
exports.DoctorBL = DoctorBL;
