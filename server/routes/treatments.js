const express = require("express");
const Treatment = require("../models/treatment");
const Patient = require("../models/patient");
const router = express.Router();

router.post("/treatments/:id" , (req,res)=>{

    console.log(req.params.id);
    console.log(req.body);

    
    Patient.findById(req.params.id , (err , foundedPatient)=>{
        if(err || !foundedPatient){
                console.log(err);
                res.status(404).send("Patient ID is not found")                
        }else{
                Treatment.create({treatment : req.body.treatment} , (err , newTreatment)=>{
                        if(err){
                            console.log(err);
                            return res.status(400).send("add treatment failed");
                            
                        }else{
                            newTreatment.save();
                            foundedPatient.treatments.push(newTreatment);
                            foundedPatient.save();
                            return res.send("treatment has been add");
                        }
                })
        }
    })

})

router.get("/treatments/:id" , (req,res)=>{

        

})

module.exports = router;
