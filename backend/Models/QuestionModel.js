"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var mongoose = require("mongoose");
exports.QuestionSchema = new mongoose.Schema({
    textArr: [{ text: String, language: { type: String, enum: models_1.Languages } }],
    creatorID: { type: String, required: true },
    isDefault: { type: Boolean, required: true },
    timestamp: { type: Number, default: Date.now },
    questionType: { type: String, enum: models_1.QuestionTypes, required: true },
    min: { type: Number, min: 0 },
    max: { type: Number, min: 1 }
});
