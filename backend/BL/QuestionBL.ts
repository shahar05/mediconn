import { Dal } from "../DAL/dal"
import { IQuestion } from '../models';


export class QuestionBL {
    private static dal: Dal = new Dal();

    public getDefaultQuestions(): Promise<IQuestion[]> {
        return new Promise((resolve, reject) => {
            QuestionBL.dal.getDefaultQuestions().then((res) => {
                resolve(res);
            })
        })
    }


    public setDefaultQuestions(question: IQuestion) {
        return new Promise((resolve, reject) => {
            QuestionBL.dal.setDefaultQuestions(question).then((res) => {
                resolve(res);
            })
        })
    }
} 