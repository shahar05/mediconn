"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBL = void 0;
var dal_1 = require("../DAL/dal");
var AdminBL = /** @class */ (function () {
    function AdminBL() {
    }
    AdminBL.prototype.updateDoctor = function (doctor) {
        return new Promise(function (resolve, reject) {
            AdminBL.dal.updateDoctor(doctor).then(function (updatedDoctor) {
                resolve(updatedDoctor);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    AdminBL.prototype.deleteDoctor = function (doctorID) {
        return new Promise(function (resolve, reject) {
            AdminBL.dal.deleteDoctor(doctorID).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    AdminBL.prototype.login = function (admin) {
        return new Promise(function (resolve, reject) {
            AdminBL.dal.getAdminByLogin(admin.username, admin.password)
                .then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    AdminBL.prototype.createDoctor = function (doctor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            AdminBL.dal.findAdminByID(doctor.creatorID).then(function (foundedAdmin) {
                if (!_this.languageContainMainLanguge(doctor.mainLanguage, doctor.languages)) {
                    reject("languages does not contain main language ");
                }
                AdminBL.dal.createDoctor(doctor).then(function (newDoctor) {
                    resolve(newDoctor);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    AdminBL.prototype.languageContainMainLanguge = function (mainLanguage, languages) {
        return !!languages.find(function (lang) { return lang === mainLanguage; });
    };
    AdminBL.prototype.getDoctors = function (adminID) {
        return new Promise(function (resolve, reject) {
            AdminBL.dal.getDoctorsByAdminID(adminID).then(function (doctors) {
                resolve(doctors);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    AdminBL.dal = new dal_1.Dal();
    return AdminBL;
}());
exports.AdminBL = AdminBL;
