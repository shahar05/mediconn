import { Router, Request, Response } from "express";
import { DoctorBL } from '../BL/doctorBL';
import { PatientBL } from "../BL/PatientBL";
import { BaseApi } from "./BaseApi";
import { QuestionBL } from "../BL/QuestionBL";
import { IQuestion } from '../models';

export class QuestionApi implements BaseApi {
    public router: Router;
    private questionBL: QuestionBL;
    constructor() {
        this.router = Router();
        this.questionBL = new QuestionBL();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/question/default', (req: Request, res: Response) => {
            this.questionBL.getDefaultQuestions().then((data) => {
                res.send(data);
            })
        })

        this.router.post('/question/default', (req: Request, res: Response) => {
            let question: IQuestion = req.body;
            this.questionBL.setDefaultQuestions(question).then((data) => {
                res.send(data);
            })
        })
    }
}