
const express = require("express");
const Doctor = require("../models/doctor");
const Question = require("../models/question");
const Patient = require("../models/patient");
const router = express.Router();

const languages = ["Hebrew", "English", "Arabic", "French", "Russian"];
//const Language = {Hebrew:"Hebrew" ,English:"English" , Arabic:"Arabic" , French:"French" ,Russian:"Russian"};
const Type = { Binary: "Binary", Regular: "Regular", Quantity: "Quantity" };







// add new question to the user array of questions
router.post("/patients/:id/questions", function (req, res) {

    console.log("new Question");

    Patient.findById(req.params.id, function (err, foundPatient) {
        if (err || !foundPatient) {
            console.log(err);
            return res.status(404).send("Not Found Patient")
        }

        // TODO: Check if the question Have the language of the Patient

        if (Type.Quantity === req.body.questionType && (!req.body.min || !req.body.max)) {
            console.log("Question with type Quantity Must Have min and max values");
            return res.status(400).send("Question with type Quantity Must Have min and max values");
        }else{
            delete req.body.min;
            delete req.body.max;
        }
        if(!matchLanguage(foundPatient , req.body.textArr)){
            return res.status(400).send("patient can hava question of his language only");
        }

            Question.create(req.body , function (err, question) {
                if (err) {
                    console.log(err);
                } else {
                    question.save();
                    foundPatient.questions.push(question);
                    foundPatient.save();

                    return res.send("Successes");
                }
            });
        
    });

});

//Find All Default questions
router.get("/default", function (req, res) {

    Question.find({ isDefault: true }, function (err, ArrayOfdefQuest) {
        if (err) {
            console.log(err);
        } else {
            res.send(ArrayOfdefQuest);
            return
        }
    })
});


//cerate new default question
router.post("/default", function (req, res) {

    console.log(req.body);

    let txtArr = makeArray(req.body.textArr);

    if (!req.body.isDefault) return res.status(400).send("Isn't a Default Question");
    if (hasDuplicate(txtArr)) {
        console.log("Text Array Has Duplicates");
        return res.status(400).send("Text Array Has Duplicates");
    }
    if (Type.Quantity === req.body.questionType && (!req.body.min || !req.body.max)) {
        console.log("Question with type Quantity Must Have min and max values");
        return res.status(400).send("Question with type Quantity Must Have min and max values");
    }else{
        delete req.body.min;
        delete req.body.max;
    }

    Doctor.findById(req.body.creatorID, (err, foundedDoctor) => {
        if (err || !foundedDoctor) {
            console.log("Not found doctor with such ID");
            return res.status(404).send("Not found doctor with such ID");
        }
        console.log("check languges");
        

        if (!hasAllLanguages(txtArr, foundedDoctor.languages)) {
            console.log("Doctor Does not Has all languages");
            return res.status(400).send("Doctor Does not Has all languages");
        }

        // After All Validation Can Create Question Safely

        console.log("try create question");
        

        console.log(req.body);
        
        Question.create(req.body, (err, newDefaultQuestion) => {

            if (err || !newDefaultQuestion){
                
                
                console.log("Something went worng while create default question"); 
                console.log(err);
                return res.status(400).send(err);
            }

            return res.send(newDefaultQuestion);

        })

    })

});


function matchLanguage(patient , txtArr) {
    
    for (let index = 0; index < txtArr.length; index++) {
        const element = txtArr[index];
        if(element.language === patient.language)return true;
    }
        return false;
}

function makeArray(textArr) {
    let arr = [];
    textArr.forEach(element => {
        arr.push(element.language)
    });
    return arr;
}

function hasDuplicate(languagesArray) {
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
    return findDuplicates(languagesArray).length > 0;
}

function hasAllLanguages(textArr, Doctorlanguages) {
    let counter =0;
    textArr.forEach(textLanguage => {
        Doctorlanguages.forEach(doctorLanguage =>{
                if(textLanguage === doctorLanguage){
                        counter++;
                        
                }
        });
    });

    return counter === Doctorlanguages.length;
}



module.exports = router;