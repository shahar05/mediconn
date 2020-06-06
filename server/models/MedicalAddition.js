const mongoose = require("mongoose");


var MedicalAdditions = new mongoose.Schema({
    name: { type: String, unique: false, required: false, trim: false },
    description: { type: String, unique: false, required: false, trim: false },
    creatorId: { type: String, unique: false, required: false, trim: false },
    patientId: { type: String, unique: false, required: false, trim: false },
    additionType: { type: Number, unique: false, required: false, trim: false },
});
module.exports = mongoose.model("MedicalAdditions", MedicalAdditions);