"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.MedicalAdditionsSchema = new mongoose_1.default.Schema({
    name: { type: String, unique: false, required: false, trim: false },
    description: { type: String, unique: false, required: false, trim: false },
    creatorId: { type: String, unique: false, required: false, trim: false },
    patientId: { type: String, unique: false, required: false, trim: false },
    additionType: { type: Number, unique: false, required: false, trim: false },
});
