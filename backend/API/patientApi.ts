import { Router, Request, Response } from "express";
import { DoctorBL } from '../BL/doctorBL';
import { PatientBL } from "../BL/PatientBL";
import { BaseApi } from "./BaseApi";

export class PatientApi implements BaseApi {
    public router: Router;
    private patientBL: PatientBL;
    constructor() {
        this.router = Router();
        this.patientBL = new PatientBL();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/patient/:id', (req: Request, res: Response) => {
            const patientId = req.param('id');
            this.patientBL.getPatient(patientId).then((data) => {
                res.send(data);
            })
        })

        this.router.post('/patient', (req: Request, res: Response) => {
            console.log('Create patient request started. body:', req.body);

            this.patientBL.createPatient(req.body).then((data) => {
                res.send(data);
            }).catch(err => {
                res.status(400).send(err)
            })
        })

    }
}