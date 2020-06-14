"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = require("../DAL/dal");
var MedicalAdditionsBL = /** @class */ (function () {
    function MedicalAdditionsBL() {
    }
    MedicalAdditionsBL.prototype.deleteMedical = function (id) {
        return new Promise(function (resolve, reject) {
            MedicalAdditionsBL.dal.deleteMedical(id).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    MedicalAdditionsBL.prototype.updateMedical = function (med) {
        return new Promise(function (resolve, reject) {
            MedicalAdditionsBL.dal.updateMedical(med).then(function (med) {
                resolve(med);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    MedicalAdditionsBL.prototype.createMedicalAddition = function (medicalAddition) {
        return new Promise(function (resolve, reject) {
            MedicalAdditionsBL.dal.createMedicalAdditions(medicalAddition).then(function (res) {
                console.log('=========>', res);
                MedicalAdditionsBL.dal.updateMedicationsOrTreatmentsToPatient(res).then(function (response) {
                    resolve(response);
                    return;
                }).catch(function (err) {
                    console.log('createMedicalAdditions 11 ');
                    console.log(err);
                    reject(err);
                });
            }).catch(function (err) {
                console.log('createMedicalAdditions   22222', err);
                reject(err);
            });
        });
    };
    MedicalAdditionsBL.dal = new dal_1.Dal();
    return MedicalAdditionsBL;
}());
exports.MedicalAdditionsBL = MedicalAdditionsBL;
