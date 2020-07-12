"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorSchema = void 0;
var mongoose_1 = require("mongoose");
var models_1 = require("../models");
exports.DoctorSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    creatorID: { type: String, required: true },
    mainLanguage: { type: String, enum: models_1.Languages, required: true },
    languages: {
        type: [{ type: String, enum: models_1.Languages, unique: false, required: true }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    }
});
function arrayLimit(languagesArray) {
    var findDuplicates = function (arr) { return arr.filter(function (item, index) { return arr.indexOf(item) != index; }); };
    if (findDuplicates(languagesArray).length != 0) {
        console.log("====================================================");
        console.log("findDuplicates");
    }
    return languagesArray.length <= 5 && findDuplicates(languagesArray).length == 0;
}
