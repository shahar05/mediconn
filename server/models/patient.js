const mongoose = require("mongoose");
const Language = ["Hebrew" ,"English" , "Arabic" , "French" ,"Russian"];

var patientSchema = new mongoose.Schema({  
    firstName: {type:String , required:true},
    lastName: {type:String , required:true},
    phoneNumber: {type:String , required:true , trim:true , unique:true },
    creatorID: {type:String , required:true},
    startHour: {type:String , default:0 , min:0 , max:23},
    endHour:   {type:String , default:23, min:0 , max:23},
    language : {type:String , enum: Language , required:true},
    lastSeen : {type:Number},
    treatments:[
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref:"Treatment"
        }
    ],
    medications:[
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref:"Medication"
        }
    ],
    questions:[
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }
    ]
});

module.exports = mongoose.model("Patient",patientSchema);