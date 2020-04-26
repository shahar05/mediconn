
const express = require("express");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
const router = express.Router();


router.get("/doctors" , (req,res)=>{
    Doctor.find({creatorID : res.body.creatorID} , (err , doctors)=>{
        if (err || !doctors || doctors.length === 0) {
                return res.status(404).send("No found doctors")
        }else{
                res.send(doctors);
        }
    })
} )


// add new doctor
router.post( "/doctors",  (req,res)=> { 

    let adminID = req.body.creatorID;
    console.log(req.body);
   
    if (!ContainMainLanguage(req.body.languages ,req.body.mainLanguage )) {
        console.log("MainLanguage does not exist in the languages array of doctor");
        res.status(400).send("MainLanguage does not exist in the languages array of doctor")  
        return;
    }

    Admin.findById(adminID , (err , foundedAdmin)=>{
        if (err || !foundedAdmin) {
            console.log("!foundedAdmin");        
            console.log(err);
            return res.status(404).send("Admin Not found");
        } else {
            Doctor.create(req.body , (err , newDoctor)=>{
                if (err) {
                    console.log(err);
                    res.status(400).send(err.massage)
                } else {

                    let token = Authenticate.createToken({
                        username: user.username,
                        password: user.password,
                        _id: user._id
                    })
                    res.send(token);
                   // res.send(newDoctor);
                }
            })
        }
    })

 });

function ContainMainLanguage(langArray , language) {
    
    for (let index = 0; index < langArray.length; index++) {
        const lng = langArray[index];
        if (lng === language ) {
            console.log("=======  ContainMainLanguage  =======");
            return true;
        }
    }
    return false;
}



module.exports = router;