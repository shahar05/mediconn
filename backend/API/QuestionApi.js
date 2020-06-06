"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var QuestionBL_1 = require("../BL/QuestionBL");
var QuestionApi = /** @class */ (function () {
    function QuestionApi() {
        this.router = express_1.Router();
        this.questionBL = new QuestionBL_1.QuestionBL();
        this.initRoutes();
    }
    QuestionApi.prototype.initRoutes = function () {
        var _this = this;
        this.router.get('/question/default', function (req, res) {
            _this.questionBL.getDefaultQuestions().then(function (data) {
                res.send(data);
            });
        });
        this.router.post('/question/default', function (req, res) {
            var question = req.body;
            _this.questionBL.setDefaultQuestions(question).then(function (data) {
                res.send(data);
            });
        });
    };
    return QuestionApi;
}());
exports.QuestionApi = QuestionApi;
