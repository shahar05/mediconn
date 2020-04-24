const mongoose = require("mongoose");

var recordSchema = new mongoose.Schema({

    patientID : {type:String , required:true},
    patientPhoneNumber: {type:String , required:true},
    answerArr:[{
        questionId:{type:String , required:true},
        answer: {type:Number , required:true}
    }   
    ],
    
    timeStemp: {type:Number , default:Date.now},
    year:{type:Number},
    mounth:{type:Number , min:1 , max:12 } ,
    day:{type:Number , min:1 , max:31 }

});

module.exports = mongoose.model("PatientRecords", recordSchema);  