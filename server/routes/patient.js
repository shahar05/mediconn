
const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Question = require("../models/question");

//get All Patients
router.get("/patients/:id", function (req, res) {
  
    // TODO:  creatorId: req.user["_id"]   --> Send id through header
    Patient.find( { creatorID: req.params.id }, function (err, patients) {
        if (err || !patients) {
            console.log(err);
            res.send(err);
        } else {
            res.send( patients );
        }
    });
});

// Show All information about user
router.get("/users/:id", function (req, res) {

    Patient.findById(req.params.id).populate("questions").exec(function (err, foundPatient) {
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
                                return res.send("New Patient Create Successfully and the number of default question is: " + i);
                            }
                        })
                    }
                })
            }else{ // Language is not exist
                return res.status(401).send("Patient language does not match doctor language");
            }
          
        }
    })

 });




module.exports = router;