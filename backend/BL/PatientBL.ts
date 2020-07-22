import { Dal } from "../DAL/dal"
import { IAdmin, IModelAdmin, IPatient, IDoctor, IQuestion, QuestionText, AppQuestion, QuestionTypes, QuestionResult, IRecord, Answer, Result } from '../models';
import { DoctorBL } from "./doctorBL";
import { QuestionBL } from "./QuestionBL";
import { QuestionType, Language } from "../enums";
import { RecordBL } from "./RecordBL";


const accountSid = 'AC5002ae0ed4bc55d2651e5ff42de9149f';
const authToken = '8b4c3726ad9b8784d17169f6f56576e7';
const client = require('twilio')(accountSid, authToken);


export class PatientBL {



    private static dal: Dal = new Dal();
    private doctorBL = new DoctorBL();
    private questionBL = new QuestionBL();

    sendSms(body :string, phoneNumber : string):Promise<any> {
return new Promise((resolve , reject)=>{


    client.messages//972 52-333-0411
    .create({
        body: body,
        from: '+12569738305',
        to: '+972' + phoneNumber
    })
    .then((message: { sid: any; }) => {
        console.log(message.sid);
        resolve()
    }  )
    .catch((err: any)=>{
        reject(err);
    });
})

    }
    getPatientByPhoneAndPassword(phoneNumber: string, password: string) {
        return new Promise((resolve, reject) => {
            PatientBL.dal.getPatientByPhoneAndPassword(phoneNumber, password)
            .then((patient: IPatient) => {

                this.getPatientByPhoneNumber(phoneNumber).then(( detail )=>{

                    resolve(detail);

                }).catch((err)=>{reject(err)})

            }).catch((err) => {
                reject(err);
            })
        })
    }

    sendSmsIfFoundPatient(phoneNumber: string) {

        return new Promise((resolve, reject) => {

            PatientBL.dal.getPatientByPhoneNumber(phoneNumber).then((patient: IPatient) => {
                let max = 999999;
                let min = 100000;
                let passNumber: number = Math.floor(Math.random() * (max - min)) + min;
                let pass: string = passNumber + "";
                patient.password = pass;

                console.log("==========");
                
                console.log(patient);
                
                console.log("==========");

                this.updatePatient(patient).then((patient: IPatient) => {

                    client.messages//972 52-333-0411
                        .create({
                            body: 'Your password is:  ' + pass,
                            from: '+12569738305',
                            to: '+972' + phoneNumber
                        })
                        .then((message: { sid: any; }) => console.log(message.sid));

                    resolve();

                }).catch((err) => {
                    reject(err);
                })


            }).catch((err) => {
                reject(err);
            })



        })


    }


    getPatientByPhoneNumber(phoneNumber: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // TODO : Check if day record exist
            PatientBL.dal.getPatientByPhoneNumber(phoneNumber).then((patient: IPatient) => {

                return resolve({ name: patient.firstName + "  " + patient.lastName, endHour: patient.endHour, startHour: patient.startHour });

            }).catch((err: any) => {
                return reject(err);
            })
        })
    }
    getPatientsAnswersByQuestion(body: { patientsId: string[], dates: { dateStart: Date; dateEnd: Date; } }, questionID: string): Promise<QuestionResult[]> { //


        return new Promise((resolve, reject) => {
            let d1: Date = new Date(body.dates.dateStart);
            let d2: Date = new Date(body.dates.dateEnd);

            let str1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + "-" + d1.getDate();
            let str2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + "-" + d2.getDate();

            PatientBL.dal.getRecordByDate(body.patientsId, str1, str2)
                .then((records: IRecord[]) => {
                    let dictionary: { [key: string]: Result[]; } = {};

                    body.patientsId.forEach(patientId => {
                        dictionary[patientId] = [];
                    });
                    records.forEach((record: IRecord) => {

                        //  let index: number = record.answerArr.findIndex(answer => answer.questionId === questionID);

                        record.answerArr.forEach((answer: Answer) => {
                            console.log(" answer.questionId: " + answer.questionId + " ?===? " + questionID);
                            console.log(typeof answer.questionId);
                            console.log(typeof questionID);

                            if ((answer.questionId + "") === questionID) {
                                dictionary[record.patientId].push({ value: answer.answer, name: record.date.toDateString() })
                            } else {

                            }
                        });


                    })

                    let questionResults: QuestionResult[] = [];
                    body.patientsId.forEach(patientId => {
                        questionResults.push({ name: patientId, series: dictionary[patientId] })
                    });


                    console.log(questionResults);

                    resolve(questionResults)



                }).catch((err) => {
                    reject(err)


                })

        })



    }

    getPatientRecords(id: string, startime: string, endtime: string): Promise<QuestionResult[]> {

        return new Promise((resolve, reject) => {

            PatientBL.dal.getPatient(id).then((patient: IPatient) => {

                PatientBL.dal.getRecordByDate(id, startime, endtime).then((records: IRecord[]) => {
                    let questionListId: string[] = [];
                    let dictionaryQuestion: { [key: string]: string; } = {};
                    let dictionary: { [key: string]: Result[]; } = {};

                    records.forEach((record: IRecord) => {
                        record.answerArr.forEach((answer: Answer) => {
                            if (!dictionary[answer.questionId]) dictionary[answer.questionId] = [];
                            dictionary[answer.questionId].push({ name: record.date.toDateString(), value: answer.answer })

                            if (!dictionaryQuestion[answer.questionId]) {
                                dictionaryQuestion[answer.questionId] = answer.questionId;
                                questionListId.push(answer.questionId);
                            }
                        })
                    });

                    PatientBL.dal.getQuestionsByArrId(questionListId).then((questions: IQuestion[]) => {

                        let questionResults: QuestionResult[] = [];
                        questions.forEach((question: IQuestion) => {

                            questionResults.push({ name: this.findTextByLanguage(patient.language, question.textArr), series: dictionary[question._id] })

                        })

                        return resolve(questionResults);

                    }).catch((err) => { reject(err) })
                }).catch((err) => { reject(err) })
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getPatientQuestionsByPhoneNumber(phoneNumber: string): Promise<AppQuestion[]> {
        return new Promise((resolve, reject) => {
            PatientBL.dal.getPatientByPhoneNumber(phoneNumber).then((patient: IPatient) => {


                console.log(patient);


                if (patient.lastSeen != undefined) {
                    let d1 = new Date();
                    let d2 = new Date(patient.lastSeen);

                    if (d1.getFullYear() === d2.getFullYear() &&
                        d1.getMonth() === d2.getMonth() &&
                        d1.getDate() === d2.getDate()) {
                        return reject(" Questionnaire already answered today");
                    }
                }



                let QuestionArray: AppQuestion[] = patient.questions.map(
                    (question: IQuestion) => {
                        return {
                            _id: question._id,
                            questionType: QuestionTypes.indexOf(question.questionType),
                            text: this.findTextByLanguage(patient.language, question.textArr),
                            min: question.min,
                            max: question.max
                        }
                    }
                )
                return resolve(QuestionArray);
            }).catch((err) => {
                return reject(err);
            })
        })


    }

    findTextByLanguage(language: Language, textArr: QuestionText[]) {


        for (let i = 0; i < textArr.length; i++) {
            const element = textArr[i];
            if (element.language.trim() === language.trim()) {
                return element.text;
            }
        }
        console.log("Not Found Language in Question Array");
        return ""
    }

    getPatient(patientId: string): Promise<IPatient> {
        return new Promise((resolve, reject) => {
            PatientBL.dal.getPatient(patientId).then((res) => {
                resolve(res);
            }).catch((err) => { reject(err); })
        })
    }

    deletePatient(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            PatientBL.dal.deletePatient(id).then((res) => {
                resolve(res);
            }).catch((err) => {
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
                    }).catch((err) => {
                        reject(err)
                    })
                })
            })
        })
    }
} 