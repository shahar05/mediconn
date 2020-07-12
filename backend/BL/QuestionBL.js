"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBL = void 0;
var dal_1 = require("../DAL/dal");
var enums_1 = require("../enums");
var QuestionBL = /** @class */ (function () {
    function QuestionBL() {
    }
    // check creatorID
    QuestionBL.prototype.updateQuestion = function (question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.questionIsValid(question)) {
                console.log("Question is not valid!");
                reject("Question is not valid!");
                return;
            }
            if (!question.creatorID) {
                console.log("No creator ID");
                reject("No creator ID");
                return;
            }
            QuestionBL.dal.getDoctor(question.creatorID).then(function (foundedDoctor) {
                if (!_this.docotrContanisQuestionLanguges(question, foundedDoctor)) {
                    console.log("Doctor does not have question languages");
                    reject("Doctor does not have question languages");
                    return;
                }
                QuestionBL.dal.updateQuestion(question)
                    .then(function (updateQuestion) {
                    resolve(updateQuestion);
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
    };
    QuestionBL.prototype.docotrContanisQuestionLanguges = function (question, foundedDoctor) {
        var questionLanguages = this.convertToLanguagesArray(question.textArr);
        var doctorLanguages = foundedDoctor.languages;
        var languageExist = false;
        if (!questionLanguages) {
            console.log("questionLanguages NUll");
            return false;
        }
        questionLanguages.forEach(function (qLang) {
            doctorLanguages.forEach(function (dLang) {
                if (qLang === dLang)
                    languageExist = true;
            });
            if (!languageExist)
                return false;
            languageExist = false;
        });
        return true;
    };
    QuestionBL.prototype.getDefaultQuestions = function () {
        return new Promise(function (resolve, reject) {
            QuestionBL.dal.getDefaultQuestions().then(function (res) {
                resolve(res);
            });
        });
    };
    QuestionBL.prototype.getDefaultQuestionsByID = function (doctorID) {
        return new Promise(function (resolve, reject) {
            QuestionBL.dal.getDefaultQuestionsByID(doctorID).then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    // Make Default Question  not Default
    QuestionBL.prototype.deleteDefaultQuestion = function (questionID) {
        return new Promise(function (resolve, reject) {
            QuestionBL.dal.findQuestionByID(questionID)
                .then(function (foundedQuestion) {
                foundedQuestion.isDefault = false;
                foundedQuestion.save();
                resolve(foundedQuestion);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    QuestionBL.prototype.setNewQuestion = function (question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var txtArr = _this.convertToLanguagesArray(question.textArr);
            if (_this.hasDuplicate(txtArr)) {
                console.log("Text Array Has Duplicates");
                reject("Text Array Has Duplicates");
            }
            QuestionBL.dal.createNewQuestion(question).then(function (question) {
                resolve(question);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    QuestionBL.prototype.setDefaultQuestions = function (question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            QuestionBL.dal.getDoctor(question.creatorID).then(function (doctor) {
                if (_this.defaultQuestionIsValid(question, doctor)) {
                    QuestionBL.dal.createNewQuestion(question).then(function (newQuestion) {
                        resolve(newQuestion);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
                else {
                    reject("Default question is not valid");
                }
            }).catch(function (err) {
                console.log(" cannot find doctor by creatorID");
                console.log(err);
                reject("cannot find doctor by creatorID  ");
            });
        });
    };
    QuestionBL.prototype.questionIsValid = function (question) {
        var txtArr = this.convertToLanguagesArray(question.textArr);
        if (enums_1.QuestionType.Quantity === question.questionType) {
            if ((!question.min || !question.max)) {
                console.log("Question with type Quantity Must Have min and max values");
                return false;
            }
        }
        else {
            delete question.min;
            delete question.max;
        }
        if (this.hasDuplicate(txtArr)) {
            console.log("Text Array Has Duplicates");
            return false;
        }
        return true;
    };
    QuestionBL.prototype.defaultQuestionIsValid = function (question, doctor) {
        var txtArr = this.convertToLanguagesArray(question.textArr);
        if (!question.isDefault) {
            console.log("Question is not default");
            return false;
        }
        if (this.hasDuplicate(txtArr)) {
            console.log("Text Array Has Duplicates");
            return false;
        }
        if (enums_1.QuestionType.Quantity === question.questionType) {
            if ((!question.min || !question.max)) {
                console.log("Question with type Quantity Must Have min and max values");
                return false;
            }
        }
        else {
            delete question.min;
            delete question.max;
        }
        if (!this.hasAllLanguages(txtArr, doctor.languages)) {
            console.log("Question Does not have all languages of the Doctor whreas cannot be created");
            return false;
        }
        return true;
    };
    QuestionBL.prototype.hasAllLanguages = function (textArr, Doctorlanguages) {
        var counter = 0;
        textArr.forEach(function (questionLanguage) {
            Doctorlanguages.forEach(function (doctorLanguage) {
                if (questionLanguage === doctorLanguage) {
                    counter++;
                }
            });
        });
        return counter === Doctorlanguages.length;
    };
    QuestionBL.prototype.hasDuplicate = function (languagesArray) {
        var findDuplicates = function (arr) { return arr.filter(function (item, index) { return arr.indexOf(item) != index; }); };
        return findDuplicates(languagesArray).length > 0;
    };
    QuestionBL.prototype.convertToLanguagesArray = function (textArr) {
        if (!textArr) {
            console.log("================");
            console.log("WTF!!!!");
        }
        return textArr.map(function (questionText) { return questionText.language; });
    };
    QuestionBL.dal = new dal_1.Dal();
    return QuestionBL;
}());
exports.QuestionBL = QuestionBL;
