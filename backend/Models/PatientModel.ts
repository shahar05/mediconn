import { Languages } from "../models";

const mongoose = require("mongoose");

export const PatientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, trim: true, unique: true },
    creatorID: { type: String, required: true },
    startHour: { type: Number, default: 0, min: 0, max: 23 },
    endHour: { type: Number, default: 23, min: 0, max: 23 },
    language: { type: String, enum: Languages, required: true },
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
