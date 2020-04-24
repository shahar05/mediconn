const mongoose = require("mongoose");

var AdminSchema = new mongoose.Schema({
    username : {type:String , required:true , unique:true},
    password : {type:String , required:true },
    hostpitalName: {type:String , required:true}
   
});
module.exports = mongoose.model("Admin", AdminSchema);