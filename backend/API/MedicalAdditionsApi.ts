import { Router, Request, Response } from "express";
import { DoctorBL } from '../BL/DoctorBL';
import { PatientBL } from "../BL/PatientBL";
import { BaseApi } from "./BaseApi";
import { QuestionBL } from "../BL/QuestionBL";
import { IQuestion, IMedicalAdditions } from '../models';
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

        this.router.put('/medical-additions', (req, res) => {
            this.medicalAdditionsBL.updateMedical(req.body).then((med: IMedicalAdditions) => {
                res.send(med);
            }).catch((err) => {
                res.status(400).send(err);
            })
        })

        this.router.delete('/medical-additions/:id', (req, res) => {
            this.medicalAdditionsBL.deleteMedical(req.params.id).then(() => {
                res.status(204).send();
            }).catch((err) => {
                res.status(400).send(err);
            })
        })

        this.router.post('/medical-additions', (req: Request, res: Response) => {
            this.medicalAdditionsBL.createMedicalAddition(req.body.medicalAddition).then((data) => {
                res.status(201).send(data);

            })
        })

    }
}