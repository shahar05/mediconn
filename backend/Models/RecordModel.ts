
const mongoose = require("mongoose");


export const RecordSchema = new mongoose.Schema({

    patientId: {type : String , required : true},

    answerArr:[{
        questionId: {  
            type: mongoose.Schema.Types.ObjectId,
            ref: "question"
        },
        answer: { type: Number, min: 0 , required: true  } 
       }   
    ],
    
    timestamp: { type: Number, default: Date.now() },
    year:{ type: Number, default: new Date().getFullYear() },
    mounth:{ type: Number, default: new Date().getMonth()+ 1},
    day:{ type: Number, default: new Date().getDate() }

});


