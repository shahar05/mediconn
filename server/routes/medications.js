const express = require("express");
const Medication = require("../models/medication");
const Patient = require("../models/patient");
const router = express.Router();

router.post("/medications/:id" , (req,res)=>{

    console.log(req.params.id);
    console.log(req.body);

    
    Patient.findById(req.params.id , (err , foundedPatient)=>{
        if(err || !foundedPatient){
                console.log(err);
                res.status(404).send("Patient ID is not found")                
        }else{
            Medication.create({medication : req.body.medication} , (err , newMedication)=>{
                        if(err){
                            console.log(err);
                            return res.status(400).send("add medication failed");
                            
                        }else{
                            newMedication.save();
                            foundedPatient.medications.push(newMedication);
                            foundedPatient.save();
                            return res.send("medications has been add");
                        }
                })
        }
    })

})



module.exports = router;
