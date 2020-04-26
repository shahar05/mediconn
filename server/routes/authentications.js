const  Authenticate  = require("../AuthenticationHandler/Authentication");

const express = require("express");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
var router = express.Router();





router.post('/login', function (req, res) {

    


    if (req.body.user === "admin") {
        delete req.body.user;
        console.log("admin");
        console.log(req.body);
        let isUserLoggedIn = loginAdmin(req.body);
        if (isUserLoggedIn.isLogin) {
            console.log("Admin Can't login");
            res.status(404).send(isUserLoggedIn)
        } else {
                res.send(isUserLoggedIn)
        }


    } else if (req.body.user === "doctor") {
        delete req.body.user;
        console.log("doctor");

        console.log(req.body);
        
        let isUserLoggedIn = 0;
        console.log("isUserlogin");
        
        console.log(loginDoctor(req.body));
        
        if (isUserLoggedIn) {
            console.log("Doctor Can't login");
            res.status(404).send(isUserLoggedIn)
        } else {
            res.status(200).send(isUserLoggedIn)
        }
    } else {
        res.status(400).send({isLogin : false , response : "Type of Request is Missing"})
    }
});



function loginDoctor(doctor) {
    console.log("in the loginDoctor");
    
    Doctor.findOne(doctor, (err, foundedDoctor) => {
        if (err || !foundedDoctor) {
            console.log("in the error");
            
            return { respone: err, isLogin: false };
        } else {
          
            let token = Authenticate.createToken({
                username: foundedDoctor.username,
                password: foundedDoctor.password,
                _id: foundedDoctor._id
            })
            console.log("Doctor is loggedin");
            console.log(foundedDoctor);
            let i = { respone: token, isLogin: true ,type:"doctor"};
            console.log(i);
            return i;
            
        }
    });
}

function loginAdmin(admin) {
    Admin.findOne(admin, (err, foundedAdmin) => {
        if (err || !foundedAdmin) {
            return { respone: err, isLogin: false };
        } else {
            let token = Authenticate.createToken({
                username: foundedAdmin.username,
                password: foundedAdmin.password,
                _id: foundedAdmin._id
            })
            console.log("Admin is loggedin");
            console.log(foundedAdmin);
            let i = { respone: token, isLogin: true ,type:"admin"};
            console.log(i);
            return i;
        }
    });
}

module.exports = router;

