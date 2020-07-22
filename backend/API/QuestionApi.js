"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionApi = void 0;
var express_1 = require("express");
var QuestionBL_1 = require("../BL/QuestionBL");
var QuestionApi = /** @class */ (function () {
    function QuestionApi() {
        this.router = express_1.Router();
        this.questionBL = new QuestionBL_1.QuestionBL();
        this.initRoutes();
    }
    QuestionApi.prototype.initRoutes = function () {
        //delete( `${BaseURL}/question/default/${questionID}`
        var _this = this;
        this.router.delete('/question/default/:id', function (req, res) {
            var questionID = req.params.id;
            _this.questionBL.deleteDefaultQuestion(questionID)
                .then(function (unDefaultQuestion) {
                console.log(unDefaultQuestion);
                res.status(204).send();
            }).catch(function (err) {
                console.log(err);
                res.status(403).send();
            });
        });
        //Map Undfiend
        this.router.put('/question', function (req, res) {
            _this.questionBL.updateQuestion(req.body).then(function (updatedQuestion) {
                res.send(updatedQuestion);
            }).catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
        });
        // Undifiend
        this.router.post('/question', function (req, res) {
            _this.questionBL.setNewQuestion(req.body).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                res.status(400).send(err);
            });
        });
        this.router.get('/question/default', function (req, res) {
            var request = req;
            var user = request.user;
            _this.questionBL.getDefaultQuestionsByID(user._id).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
        });
        this.router.get('/question/defaults/:id', function (req, res) {
            var id = req.params.id;
            _this.questionBL.getDefaultQuestionsByID(id).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
        });
        this.router.get('/question/default/:id', function (req, res) {
            _this.questionBL.getDefaultQuestionsByID(req.params.id).then(function (data) {
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
