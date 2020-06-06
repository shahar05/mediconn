import { Dal } from "../DAL/dal"
import { IAdmin, IModelAdmin, IPatient, IDoctor, IQuestion } from '../models';
import { DoctorBL } from "./doctorBL";
import { QuestionBL } from "./QuestionBL";

export class PatientBL {
    private static dal: Dal = new Dal();
    private doctorBL = new DoctorBL();
    private questionBL = new QuestionBL();

    getPatient(patientId: string) {
        return new Promise((resolve, reject) => {
            PatientBL.dal.getPatient(patientId).then((res) => {
                resolve(res);
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
                this.questionBL.getDefaultQuestions().then((questions: IQuestion[]) => {
                    patient.questions = questions;
                    PatientBL.dal.createPatient(patient).then((res: IPatient) => {
                        resolve(res);
                    })
                })
            })
        })
    }
} 