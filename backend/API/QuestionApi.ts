import { Router, Request, Response } from "express";
import { DoctorBL } from '../BL/doctorBL';
import { PatientBL } from "../BL/PatientBL";
import { BaseApi } from "./BaseApi";
import { QuestionBL } from "../BL/QuestionBL";
import { IQuestion, IDoctor } from '../models';

export class QuestionApi implements BaseApi {
    public router: Router;
    private questionBL: QuestionBL;
    constructor() {
        this.router = Router();
        this.questionBL = new QuestionBL();
        this.initRoutes();
    }

    initRoutes() {
//delete( `${BaseURL}/question/default/${questionID}`

        this.router.delete('/question/default/:id' , (req :Request ,res:Response)=>{
            let questionID : string=  req.params.id;
            this.questionBL.deleteDefaultQuestion(questionID)
            .then((unDefaultQuestion : IQuestion)=>{
                console.log(unDefaultQuestion);
                res.status(204).send();
            }).catch((err : any)=>{
                console.log(err);
                res.status(403).send();
            }) 
        })

        //Map Undfiend
        this.router.put('/question' , (req : Request,res : Response)=>{
            this.questionBL.updateQuestion(req.body).then((updatedQuestion : IQuestion)=>{     
                    res.send(updatedQuestion);
            }).catch((err : any)=>{
                console.log(err);
                res.status(400).send(err)
            })

        })
        // Undifiend
        this.router.post('/question' , (req :Request, res : Response)=>{
            this.questionBL.setNewQuestion(req.body).then((data)=>{
                    res.send(data);
            } ).catch((err:any)=>{
                res.status(400).send(err)
            })
        })

        this.router.get('/question/default', (req: Request, res: Response) => {
            let request: any = req
            let user: IDoctor = request.user;
            this.questionBL.getDefaultQuestionsByID(user._id).then((data) => {
                res.send(data);
            }).catch((err)=>{
                console.log(err);
                res.status(400).send(err);
            })
        })

        this.router.get('/question/default/:id', (req: Request, res: Response) => {
            this.questionBL.getDefaultQuestionsByID(req.params.id).then((data) => {
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