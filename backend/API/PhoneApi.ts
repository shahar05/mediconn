import { Router, Request, Response } from "express";
import { PatientBL } from "../BL/PatientBL";
import { RecordBL } from "../BL/RecordBL";
import { BaseApi } from "./BaseApi";
import { AppQuestion, IPatient, Answer, IRecord } from "../models";


export class PhoneApi implements BaseApi {
    public router: Router;
    private patientBL: PatientBL;
    private recordBL: RecordBL;


    constructor() {
        this.router = Router();
        this.patientBL = new PatientBL();
        this.recordBL = new RecordBL();
        this.initRoutes();
    }



    initRoutes() {

        // TODO: lookup for patient
        // TODO: if patient found and authenticare the continue processes  
        // TODO: if patient found and authenticate Create Password send it by sms and store in patient schema


        this.router.get('/patient/sms/:phonenumber/:password', (req, res) => {

            let phoneNumber = req.params.phonenumber;
            let password = req.params.password;

            this.patientBL.getPatientByPhoneAndPassword(phoneNumber, password).then((patientDetail) => {
                res.send(patientDetail)
            }).catch(err => console.log(err))

        })

        this.router.get('/patient/details/:phonenumber', (req, res) => {
            this.patientBL.getPatientByPhoneNumber(req.params.phonenumber).then((patientDetail: any) => {
                res.send(patientDetail)
            }).catch((err) => {
                res.status(400).send(err);
            })
        })

        this.router.get('/patient/sms/:phonenumber', (req, res) => {
            this.patientBL.sendSmsIfFoundPatient(req.params.phonenumber).then(() => {
                res.send();
            }).catch((err) => {
                res.status(400).send(err);
            })
        })


        this.router.get('/patient/questions/:phonenumber', (req, res) => {
            this.patientBL.getPatientQuestionsByPhoneNumber(req.params.phonenumber)
                .then((QuestionArray: AppQuestion[]) => {
                    console.log(QuestionArray);
                    res.send({ QuestionArray: QuestionArray })

                }).catch((err) => {
                    res.status(400).send(err);
                })
        })

        this.router.post('/patient/records/:phonenumber', (req, res) => {
            console.log("======================");

            console.log(req.body);


            let record: any = { answerArr: req.body.arr, patientId: req.params.phonenumber }
            this.recordBL.createRecord(record).then((newRecord: IRecord) => {
                console.log(newRecord);
                res.send({ msg: "ok" });
            }).catch((err) => {
                console.log(err);
                res.status(400).send("Fail To save Record");
            })
        })





        this.router.get('/patient/:id/records/:startime/:endtime', (req, res) => {
            let s: string = req.params.startime;
            let e: string = req.params.endtime;

            this.patientBL.getPatientRecords(req.params.id, s, e).then((response: any) => {
                console.log(response);

                res.send(response)
            }).catch((err) => {
                console.log(err);
            })
        })

    }
}







        // Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure



               // this.patientBL.getPatientByPhoneNumber(req.params.phonenumber).then(( patient : IPatient)=>{
                //     let answers : Answer[] = req.body.arr.map( ( a : Answer) => { return { questionId : a.questionId , answer : a.answer  } });  
                //     let record : any = {patientID : patient._id , answerArr: answers};

                //     this.recordBL.createRecord( record);
                // }).catch((err)=>{
                //         console.log(err);

                // })

// console.log("in the patient post");
// console.log(req.body);
// res.send({msg:"ok"});

// var date = new Date();
// console.log(date.getFullYear());
// console.log("========");
// console.log(date.getMonth());

// console.log("Got Post Request");



// let newAns = {
//     patientPhoneNumber: req.params.phoneNumber,
//     answerArr: req.body.arr, 
//     timeStemp: Date.now(),
//     year: date.getFullYear(),
//     day: date.getDate(),
//     mounth:(date.getMonth() + 1)
// }

//  PatientRecords.create(newAns , function(err , newPatientRec){
//      if(err){
//          console.log(err);
//      }else{
//          console.log(newPatientRec);
//          res.send({msg: "ok"});
//      }
//  })