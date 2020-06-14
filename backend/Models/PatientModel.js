"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var mongoose = require("mongoose");
exports.PatientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, trim: true, unique: true },
    creatorID: { type: String, required: true },
    startHour: { type: Number, default: 0, min: 0, max: 23 },
    endHour: { type: Number, default: 23, min: 0, max: 23 },
    language: { type: String, enum: models_1.Languages, required: true },
    lastSeen: { type: Number },
    treatments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MedicalAdditions"
        }
    ],
    medications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MedicalAdditions"
        }
    ],
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question"
        }
    ]
});
