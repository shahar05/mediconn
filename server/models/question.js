const mongoose = require("mongoose");

const Language = ["Hebrew" ,"English" , "Arabic" , "French" ,"Russian"];
const Type = ["Binary" , "Regular" , "Quantity"];

var QuestionSchema = new mongoose.Schema({
    
    textArr:  [  {  text:String ,  language  :  {type:String , enum : Language} } ] ,
    creatorID: {type:String , required:true},
    isDefault: {type:Boolean , required:true},
    timestemp: {type:Number , default:Date.now},
    questionType: {type : String , enum:Type ,  required:true},
    min:{type:Number , min:0 },
    max:{type:Number , min:0 }
});

module.exports = mongoose.model("Question", QuestionSchema);