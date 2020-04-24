const mongoose = require("mongoose");


var MedicationSchema = new mongoose.Schema({
    medicationName: {type:String , unique:true , required:true , trim:true}
});
module.exports = mongoose.model("Medication", MedicationSchema);