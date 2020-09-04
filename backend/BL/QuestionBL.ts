import { Dal } from "../DAL/dal"
import { IQuestion, QuestionText, IDoctor } from '../models';
import { Language, QuestionType } from "../enums";


export class QuestionBL {

    private static dal: Dal = new Dal();

    // check creatorID
    updateQuestion(question: IQuestion): Promise<IQuestion> {
        return new Promise((resolve, reject) => {
            if (!this.questionIsValid(question)) {
                console.log("Question is not valid!");                
                reject("Question is not valid!");
                return;
            }
            if (!question.creatorID) {
                console.log("No creator ID");
                reject("No creator ID");
                return;
            }
            QuestionBL.dal.getDoctor(question.creatorID).then((foundedDoctor : IDoctor)=>{
                    if( !this.docotrContanisQuestionLanguges(question , foundedDoctor) ){
                        console.log("Doctor does not have question languages");
                        reject("Doctor does not have question languages");
                        return;
                    }

                    QuestionBL.dal.updateQuestion(question)
                    .then((updateQuestion : IQuestion)=>{
                            resolve(updateQuestion);
                    }).catch((err : any)=>{
                            reject(err);
                    })

            })
        })
    }
    private docotrContanisQuestionLanguges(question : IQuestion, foundedDoctor : IDoctor){
            let questionLanguages : Language[] = this.convertToLanguagesArray(question.textArr);
            let doctorLanguages : Language[] = foundedDoctor.languages;
            let languageExist :boolean= false;

            if(!questionLanguages){
                console.log("questionLanguages NUll");
                
                return false;
            }

            questionLanguages.forEach( qLang => {
                doctorLanguages.forEach(dLang => {
                        if(qLang === dLang)languageExist = true;
                });
                if(!languageExist)return false;
                languageExist = false;
            });

            return true;
    }

    public getDefaultQuestions(): Promise<IQuestion[]> {
        return new Promise((resolve, reject) => {
            QuestionBL.dal.getDefaultQuestions().then((res) => {
                resolve(res);
            })
        })
    }
    public getDefaultQuestionsByID(doctorID : string): Promise<IQuestion[]> {
        return new Promise((resolve, reject) => {
            QuestionBL.dal.getDefaultQuestionsByID(doctorID).then((res) => {
                resolve(res);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    // Make Default Question  not Default
    deleteDefaultQuestion(questionID: string): Promise<IQuestion> {
        return new Promise((resolve, reject) => {
            QuestionBL.dal.findQuestionByID(questionID)
                .then((foundedQuestion: IQuestion) => {
                    foundedQuestion.isDefault = false;
                    foundedQuestion.save();
                    resolve(foundedQuestion);
                }).catch((err: any) => {
                    reject(err);
                })
        })
    }

    setNewQuestion(question: IQuestion): Promise<IQuestion> {
        return new Promise((resolve, reject) => {

            let txtArr = this.convertToLanguagesArray(question.textArr);
            if (this.hasDuplicate(txtArr)) {
                console.log("Text Array Has Duplicates");
                reject("Text Array Has Duplicates");

            }
            QuestionBL.dal.createNewQuestion(question).then((question) => {
                resolve(question);
            }).catch((err: any) => {
                reject(err)
            })
        })
    }


    public setDefaultQuestions(question: IQuestion): Promise<any> {

        return new Promise((resolve, reject) => {

            QuestionBL.dal.getDoctor(question.creatorID).then((doctor: IDoctor) => {
                if (this.defaultQuestionIsValid(question, doctor)) {
                    QuestionBL.dal.createNewQuestion(question).then((newQuestion: IQuestion) => {

                        resolve(newQuestion);
                    }).catch((err: any) => {
                        reject(err);
                    })
                } else {
                    reject("Default question is not valid");
                }
            }).catch((err: any) => {
                console.log(" cannot find doctor by creatorID");
                console.log(err);
                reject("cannot find doctor by creatorID  ");
            })
        })
    }

    private questionIsValid(question: IQuestion): boolean {
        let txtArr = this.convertToLanguagesArray(question.textArr);

        if (QuestionType.Quantity === question.questionType) {
            if ((question.min === undefined || question.min === null  || !question.max)) {
                console.log("Question with type Quantity Must Have min and max values");
                return false;
            }
        } else {

            delete question.min;
            delete question.max;
        }
        if (this.hasDuplicate(txtArr)) {
            console.log("Text Array Has Duplicates");
            return false;
        }
        return true;
    }

    private defaultQuestionIsValid(question: IQuestion, doctor: IDoctor): boolean {
        let txtArr = this.convertToLanguagesArray(question.textArr);

        if (!question.isDefault) {
            console.log("Question is not default");
            return false;
        }
        if (this.hasDuplicate(txtArr)) {
            console.log("Text Array Has Duplicates");
            return false;
        }
        if (QuestionType.Quantity === question.questionType) {
            
            if (( question.min === undefined || question.min === null  || !question.max)) {
                console.log("Question with type Quantity Must Have min and max values");
                return false;
            }
        } else {

            delete question.min;
            delete question.max;
        }
        if (!this.hasAllLanguages(txtArr, doctor.languages)) {
            console.log("Question Does not have all languages of the Doctor whreas cannot be created");
            return false;
        }
        return true;
    }

    private hasAllLanguages(textArr: Language[], Doctorlanguages: Language[]): boolean {
        let counter: number = 0;
        textArr.forEach(questionLanguage => {
            Doctorlanguages.forEach(doctorLanguage => {
                if (questionLanguage === doctorLanguage) {
                    counter++;
                }
            });
        });
        return counter === Doctorlanguages.length;
    }

    private hasDuplicate(languagesArray: Language[]): boolean {
        let findDuplicates: Function = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) != index);
        return findDuplicates(languagesArray).length > 0;
    }

    private convertToLanguagesArray(textArr: QuestionText[]): Language[] {
        if(!textArr){
            console.log("================");
            console.log("WTF!!!!");
        }
        
        return textArr.map(questionText => questionText.language);
    }

}

