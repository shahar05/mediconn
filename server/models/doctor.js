const mongoose = require("mongoose");

const Language = ["Hebrew" ,"English" , "Arabic" , "French" ,"Russian"]; 

var DoctorSchema = new mongoose.Schema({

    username :  {type:String , required:true , unique:true }   ,
    password :  {type:String , required:true}   ,
    firstName :  {type:String , required:true}  ,
    lastName   : {type:String , required:true}  ,
    department : {type:String , required:true} ,
    phoneNumber : {type:String , required:true , unique:true},
    creatorID  :  {type:String , required:true},
    mainLanguage : { type:String, enum : Language ,required:true},
    languages : {   type:[{type : String , enum : Language ,unique:false ,required:true}] ,
                    validate:[arrayLimit, '{PATH} exceeds the limit of 5']
}
});

function arrayLimit(languagesArray) {
    
     let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
     if (findDuplicates(languagesArray).length != 0) {
        console.log("====================================================");
         console.log("findDuplicates");
     }
    return languagesArray.length <= 5 && findDuplicates(languagesArray).length == 0;
  }
module.exports = mongoose.model("Doctor", DoctorSchema);

