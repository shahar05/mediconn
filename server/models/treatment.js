const mongoose = require("mongoose");


var TreatmentSchema = new mongoose.Schema({
    treatment: {type:String , unique:true , required:true , trim:true}
});
module.exports = mongoose.model("Treatment", TreatmentSchema);