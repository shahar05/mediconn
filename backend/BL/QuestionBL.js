"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = require("../DAL/dal");
var QuestionBL = /** @class */ (function () {
    function QuestionBL() {
    }
    QuestionBL.prototype.getDefaultQuestions = function () {
        return new Promise(function (resolve, reject) {
            QuestionBL.dal.getDefaultQuestions().then(function (res) {
                resolve(res);
            });
        });
    };
    QuestionBL.prototype.setDefaultQuestions = function (question) {
        return new Promise(function (resolve, reject) {
            QuestionBL.dal.setDefaultQuestions(question).then(function (res) {
                resolve(res);
            });
        });
    };
    QuestionBL.dal = new dal_1.Dal();
    return QuestionBL;
}());
exports.QuestionBL = QuestionBL;
