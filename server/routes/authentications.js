const { Authenticate } = require("../AuthenticationHandler/Authentication");

const express = require("express");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
var router = express.Router();





router.post('/login', function (req, res) {

    console.log(req.body);
    
    
    if(req.body.user === "admin"){
        delete req.body.user;
        loginAdmin(req.body , req , res);
    }else{
        delete req.body.user;
        loginDoctor(req.body , req , res);
    }



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

function loginAdmin(doctor) {
    Doctor.findOne(doctor, (err, foundedDctor) => {
        if(err || !foundedDctor){
            return {respone : err , ans : false};
        }else{
            let token = Authenticate.createToken({
                username: foundedDctor.username,
                password: foundedDctor.password,
                _id: foundedDctor._id
            })
            
            return {respone : token , ans : true};
        }
    });
}

function loginAdmin(admin) {
    Admin.findOne(admin, (err, foundedAdmin) => {
        if(err || !foundedAdmin){
            return {respone : err , ans : false};
        }else{
            let token = Authenticate.createToken({
                username: foundedAdmin.username,
                password: foundedAdmin.password,
                _id: foundedAdmin._id
            })
            
            return {respone : token , ans : true};
        }
    });
}

module.exports = router;

