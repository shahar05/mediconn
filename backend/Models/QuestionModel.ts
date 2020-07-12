import { Languages, QuestionTypes } from "../models";

const mongoose = require("mongoose");


export const QuestionSchema = new mongoose.Schema({

    textArr: [  { text: String , language: { type: String, enum: Languages } }  ],
    creatorID: { type: String, required: true },
    isDefault: { type: Boolean, required: true },
    timestamp: { type: Number, default: Date.now },
    questionType: { type: String, enum: QuestionTypes, required: true },
    min: { type: Number, min: 0 },
    max: { type: Number, min: 1 }
});