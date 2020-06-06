const express = require("express");
const Patient = require("../models/patient");
const MedicalAdditions = require('../models/MedicalAddition');
const router = express.Router();
const mongoose = require("mongoose");

router.post("/medical-additions", (req, res) => {
    console.log('medical-additions')

    let medicalAddition = req.body.medicalAddition;

    MedicalAdditions.create(medicalAddition, (err, newMedication) => {
        if (err) {
            console.log(err)
            res.send(500);
            return;
        }

        let propertyName = medicalAddition.additionType === 0 ? 'medications' : 'treatments';
        Patient.findOneAndUpdate({ _id: medicalAddition.patientId }, { $push: { [propertyName]: newMedication } }, (err, doc) => {
            if (err) {
                res.send(500);
                return;
            }
            res.send(newMedication);
        });

    })

})



module.exports = router;
