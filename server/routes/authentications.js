const Authenticate = require("../AuthenticationHandler/Authentication");

const express = require("express");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
var router = express.Router();




router.post('/login', function (req, res) {
    if (req.body.user === "admin") {
        delete req.body.user;
        Admin.findOne(req.body, (err, foundedAdmin) => {
            if (err || !foundedAdmin) {
                    console.log(err);
                    res.status(404).send({isLogin:false, response: "doctor not found"});
                    
            } else {
                let token = Authenticate.createToken({
                    username: foundedAdmin.username,
                    password: foundedAdmin.password,
                    _id: foundedAdmin._id
                })
                res.send({token : token , isLogin : true ,type:"admin" , object :foundedAdmin })
                
            }
        })

    } else if (req.body.user === "doctor") {
        delete req.body.user;
        Doctor.findOne(req.body, (err, foundedDoctor) => {
                if (err || !foundedDoctor) {
                    console.log(err);
                    res.status(404).send({isLogin:false , response: "doctor not found"});
                } else {
                    let token = Authenticate.createToken({
                        username: foundedDoctor.username,
                        password: foundedDoctor.password,
                        _id: foundedDoctor._id
                    })
                    res.send({token : token , isLogin : true ,type:"doctor" , object :foundedDoctor})
                }
        })
    } else {
        res.status(400).send({ isLogin: false, response: "Type of Request is Missing" })

    }
})




module.exports = router;

