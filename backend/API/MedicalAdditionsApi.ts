import { Router, Request, Response } from "express";
import { DoctorBL } from '../BL/DoctorBL';
import { PatientBL } from "../BL/PatientBL";
import { BaseApi } from "./BaseApi";
import { QuestionBL } from "../BL/QuestionBL";
import { IQuestion } from '../models';
import { MedicalAdditionsBL } from "../BL/MedicalAdditionsBL";

export class MedicalAdditionsApi implements BaseApi {
    public router: Router;
    private medicalAdditionsBL: MedicalAdditionsBL;
    constructor() {
        this.router = Router();
        this.medicalAdditionsBL = new MedicalAdditionsBL();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/medical-additions', (req: Request, res: Response) => {
            this.medicalAdditionsBL.createMedicalAddition(req.body.medicalAddition).then((data) => {
                res.send(data);
            })
        })

    }
}