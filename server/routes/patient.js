
const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Question = require("../models/question");

//get All Patients
router.get("/patients/:id", function (req, res) {
    
    console.log("all patiens");
    
    // TODO:  creatorId: req.user["_id"]   --> Send id through header
    Patient.find( { creatorID: req.params.id},  (err, patients)=> {
        if (err || !patients) {
            console.log(err);
            res.send(err);
        } else {
            res.send( patients );
        }
    });
});

// Show All information about user
router.get("/patient/:id",  (req, res)=> {

    Patient.findById(req.params.id).populate("questions").populate("treatments").populate("medications").exec( (err, foundPatient)=> {
        if (err || !foundPatient) {
            console.log("its an error my friend!");
        } else {
            res.send(foundPatient);
        }
    });

});



// add new Patient
router.post( "/patients",  (req,res)=> { 

    console.log(req.body);
    let doctorID = req.body.creatorID;

    let regex = /[0-9]{3}-?[0-9]{7}/
    var phone = req.body.phoneNumber.match(regex);
    if (!phone) {
        console.log("phone is not correct");
        return res.status(400).send("Phone is not match the Pattern")
    }
    req.body.phoneNumber = req.body.phoneNumber.replace('-','');
    console.log(req.body.phoneNumber);

    Doctor.findById(doctorID , (err , foundedDoctor)=>{
        if (err  || !foundedDoctor) {
            console.log(err);
            return res.status(404).send("Doctor Does not Found");
        } else {

            let languageIsExist = false;

            foundedDoctor.languages.forEach(language => {
                              
                if (language == req.body.language) {
                    languageIsExist = true;
                    console.log("languageIsExist");   
                }
            });       

            if(languageIsExist){
                Patient.create(req.body , (err , newPatient)=>{
                    if (err || !newPatient) {
                        console.log(err);
                        console.log("try create Patient");
                        res.status(401).send(err.message)
                    } else {
                        Question.find({isDefault: true , creatorID : doctorID } , (err,questionDefaultArray)=>{
                            if (err ) {
                                console.log(err);
                                console.log("try find Questions");       
                            } else {
                                let i = 0;
                                for ( i = 0; i < questionDefaultArray.length; i++) {
                                    newPatient.questions.push(questionDefaultArray[i]);
                                }
                                newPatient.save();

                                console.log("New Patient Create Successfully and the number of default question is: " + i);
                                return res.status(200).send(newPatient);
                            }
                        })
                    }
                })
            }else{ // Language is not exist
                console.log("wtf");
                
                return res.status(401).send("Patient language does not match doctor languages: " + foundedDoctor.languages);
            }
          
        }
    })

 });




module.exports = router;