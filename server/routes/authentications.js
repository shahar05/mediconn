const express = require("express");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
var router = express.Router();





router.post('/login', function (req, res) {

    console.log(req.body);
    
    

    console.log("Login Route");
    Admin.findOne(req.body, (err, foundAdmin) => {
        if (err || !foundAdmin) {
            console.log("dont found admin try fin ddoctor");
            Doctor.findOne(req.body , (err,foundDoctor)=>{
                if (err || !foundDoctor) {
                    console.log("dont found admin or ddoctor");
                    console.log(err);
                    return res.status(404).send("username or passwrod is incorrect")
                }else{
                    console.log(" found ddoctor");
                    return   res.send(foundDoctor)
                }           
            })
        }else{
            console.log(" found admin");
            return res.send(foundAdmin)
        }
       
    })

});


module.exports = router;

