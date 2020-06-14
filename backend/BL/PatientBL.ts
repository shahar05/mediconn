import { Dal } from "../DAL/dal"
import { IAdmin, IModelAdmin, IPatient, IDoctor, IQuestion, QuestionText } from '../models';
import { DoctorBL } from "./doctorBL";
import { QuestionBL } from "./QuestionBL";
import { QuestionType } from "../enums";

export class PatientBL {


    private static dal: Dal = new Dal();
    private doctorBL = new DoctorBL();
    private questionBL = new QuestionBL();

    getPatient(patientId: string): Promise<IPatient> {
        return new Promise((resolve, reject) => {
            PatientBL.dal.getPatient(patientId).then((res) => {
                resolve(res);
            }).catch((err) => { reject(err); })
        })
    }

    deletePatient(id: string):Promise<string> {
        return new Promise((resolve , reject)=>{
            PatientBL.dal.deletePatient(id).then((res)=>{
                resolve(res);
            }).catch((err)=>{
                reject(err);
            })
        })
    }


    deleteQuestionFromPatientArray(patientId: string, questionID: string) {
        return new Promise((resolve, reject) => {

            this.getPatient(patientId).then((foundPatient) => {
                let i: number = foundPatient.questions.findIndex((quest) => quest._id.equals(questionID))
                if (i == -1) {
                    console.log("Not found Question in the array");
                    reject("Not found Question in the array");
                } else {
                    foundPatient.questions.splice(i, 1);
                    foundPatient.save();
                    console.log("Deleted Successfully");
                    resolve("Deleted Successfully");
                }


            })


        })
    }


    setQuestionToPatient(patientId: string, doctorID: string, question: IQuestion) {
        return new Promise((resolve, reject) => {

            if (question.isDefault === true) {
                console.log("Question should not be default");
                reject("Question should be default");
            }
            if (doctorID !== question.creatorID) {
                console.log("CreatorID Not equal to DoctorID");
                reject("CreatorID Not equal to DoctorID");
            }
            if (QuestionType.Quantity === question.questionType && (!question.min || !question.max)) {
                console.log("Question with type Quantity Must Have min and max values");
                reject("Question with type Quantity Must Have min and max values");
            } else {
                delete question.min;
                delete question.max;
            }

            this.getPatient(patientId).then((foundPatient) => {
                if (!this.questionContainsPatientLanguage(foundPatient, question.textArr)) {
                    console.log("patient can hava question text of his language only");
                    reject("patient can hava question text of his language only");
                }

                this.questionBL.setNewQuestion(question).then((newQuestion) => {
                    foundPatient.questions.push(newQuestion);
                    foundPatient.save();
                    resolve(newQuestion);
                }).catch(() => {
                    reject("Unable to create Question");
                })


            }).catch(() => {
                console.log("Patient Not found");
                reject("Patient Not found")
            })


        })
    }

    private questionContainsPatientLanguage(patient: IPatient, txtArr: QuestionText[]): boolean {

        for (let index = 0; index < txtArr.length; index++) {
            const element = txtArr[index];
            if (element.language === patient.language) return true;
        }
        return false;
    }

    updatePatient(patient: IPatient): Promise<IPatient> {
        return new Promise((resolve, reject) => {
            PatientBL.dal.getDoctor(patient.creatorID).then((doctor: IDoctor) => {
                PatientBL.dal.updatePatient(patient).then((patient: IPatient) => {
                    resolve(patient);
                    return;
                }).catch((err) => {
                    reject(err);
                    return;
                })
            }).catch((err) => {
                console.error(err);
                reject(err);
                return;
            })
        })
    }


    createPatient(patient: IPatient) {
        return new Promise((resolve, reject) => {
            if (!patient) {
                reject('No patient provided');
                return;
            }
            let regex = /[0-9]{3}-?[0-9]{7}/
            let phone = patient.phoneNumber.match(regex);
            if (!phone) {
                console.log("phone is not correct");
                reject("phone is not correct")
                return
            }
            patient.phoneNumber = patient.phoneNumber.replace('-', '');
            let doctorId = patient.creatorID;
            this.doctorBL.getDoctor(doctorId).then((doctor: IDoctor) => {
                if (!doctor) {
                    reject('Doctor Does not Found');
                    return;
                }

                let isPatientLanguageExistInDoctor = doctor.languages.includes(patient.language);
                if (!isPatientLanguageExistInDoctor) {
                    reject(`Patient language does not match doctor languages, ${doctor.languages}`);
                    return;
                }

                this.questionBL.getDefaultQuestionsByID(patient.creatorID).then((questions: IQuestion[]) => {
                    patient.questions = questions;
                    PatientBL.dal.createPatient(patient).then((res: IPatient) => {
                        resolve(res);
                    })
                })
            })
        })
    }
} 