import { Router, Request, Response } from "express";
import { DoctorBL } from '../BL/doctorBL';
import { PatientBL } from "../BL/PatientBL";
import { BaseApi } from "./BaseApi";
import { IDoctor, IPatient } from "../models";

export class PatientApi implements BaseApi {
    public router: Router;
    private patientBL: PatientBL;
    constructor() {
        this.router = Router();
        this.patientBL = new PatientBL();
        this.initRoutes();
    }

    initRoutes() {
     
        this.router.delete('/patient/:id' , (req,res)=>{
            this.patientBL.deletePatient(req.params.id).then((response)=>{
                console.log(response);
                res.status(204).send();
            }).catch((err)=>{
                console.log(err);
                res.status(400).send(err);
            })
        })

        this.router.put('/patient', (req: Request, res: Response) => {
            console.log('Edit patient request started. body:', req.body);
            let patient : IPatient = req.body;
            this.patientBL.updatePatient(patient).then((data) => {
                res.send(data);
            }).catch(err => {
                res.status(400).send(err);
            })
        })

        this.router.post('/patient', (req: Request, res: Response) => {
            console.log('Create patient request started. body:', req.body);

            this.patientBL.createPatient(req.body).then((data) => {
                res.send(data);
            }).catch(err => {
                res.status(400).send(err);
            })
        })

        this.router.get('/patient/:id', (req: Request, res: Response) => {
            const patientId = req.params.id;

            this.patientBL.getPatient(patientId).then((data) => {
                res.send(data);
            }).catch((err:any)=>{
                res.status(404).send(err);
            })
        })

        this.router.delete('/patient/:id/question/:questionid' , (req :Request,res:Response)=>{
            const patientId = req.params.id;
            const questionID = req.params.questionid;

            this.patientBL.deleteQuestionFromPatientArray(patientId , questionID).then((msg : any)=>{
                res.status(204).send(msg);           
            }).catch((err : any)=>{
                res.status(403).send(err);
            })
        })

        this.router.post('/patient/:id/question', (req: Request, res: Response) => {
            let request: any = req;
            const   doctor : IDoctor = request.user;
            const patientId = req.params.id;

            this.patientBL.setQuestionToPatient(patientId, doctor._id , req.body).then((data) => {
                res.send(data);
            }).catch((err:any)=>{
                res.status(400).send(err);
            })
        })




    }
}