"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPopupType = exports.QuestionType = exports.Language = void 0;
var Language;
(function (Language) {
    Language["Hebrew"] = "Hebrew";
    Language["English"] = "English";
    Language["Arabic"] = "Arabic";
    Language["French"] = "French";
    Language["Russian"] = "Russian";
})(Language = exports.Language || (exports.Language = {}));
var QuestionType;
(function (QuestionType) {
    QuestionType["Binary"] = "Binary";
    QuestionType["Regular"] = "Regular";
    QuestionType["Quantity"] = "Quantity";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var AddPopupType;
(function (AddPopupType) {
    AddPopupType[AddPopupType["Medication"] = 0] = "Medication";
    AddPopupType[AddPopupType["Treatments"] = 1] = "Treatments";
})(AddPopupType = exports.AddPopupType || (exports.AddPopupType = {}));
