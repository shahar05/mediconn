import { DoctorSchema } from './../Models/DoctorModel';
import mongoose, { Connection, Schema, Model } from 'mongoose';
import { IDoctor, IAdmin, IModelAdmin, IPatient, IQuestion, IMedicalAdditions, QuestionText, IRecord } from '../models';
import { AdminSchema } from '../Models/AdminModel';
import { PatientSchema } from '../Models/PatientModel';
import { RecordSchema } from '../Models/RecordModel';
import { QuestionSchema } from '../Models/QuestionModel';
import { MedicalAdditionsSchema } from '../Models/MedicalAdditionsModel';
import { QuestionType } from '../enums';

var env = require('../env.json');


export class Dal {


    private static day: number = 1;
    private static connection: Connection;

    //Schemas
    private recordSchema: Model<IRecord> = mongoose.model('Record', RecordSchema);
    private doctorSchema: Model<IDoctor> = mongoose.model('Doctor', DoctorSchema);
    private adminSchema: Model<IModelAdmin> = mongoose.model('Admin', AdminSchema);
    private patientSchema: Model<IPatient> = mongoose.model('Patient', PatientSchema);
    private questionSchema: Model<IQuestion> = mongoose.model('question', QuestionSchema);
    private medicalAdditionsSchema: Model<IMedicalAdditions> = mongoose.model('MedicalAdditions', MedicalAdditionsSchema);


    constructor() {
        mongoose.connect(env.mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true })
            .then((mongoose) => {
                mongoose.set('useCreateIndex', true);
            });
    }


    getPatientByPhoneAndPassword(phoneNumber: string, password: string):Promise<IPatient> {
        return new Promise((resolve, reject) => {

            this.patientSchema.findOne({ phoneNumber: phoneNumber, password: password }, (err, foundPatient) => {
                if (err || !foundPatient) {
                    return reject(err);
                }

                return resolve(foundPatient);
            })

        })


    }


    getAdminByID(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.adminSchema.findById(id, (err, admin) => {
                if (err || !admin) {
                    return reject(err);
                }
                resolve(admin);
            })
        })
    }

    updateDoctor(doctor: IDoctor): Promise<IDoctor> {

        return new Promise((resolve, reject) => {

            this.getDoctor(doctor._id).then((foundedDoctor: IDoctor) => {
                foundedDoctor.department = doctor.department;
                foundedDoctor.password = doctor.password;
                foundedDoctor.firstName = doctor.firstName;
                foundedDoctor.phoneNumber = doctor.phoneNumber;
                foundedDoctor.lastName = doctor.lastName;
                foundedDoctor.username = doctor.username;
                foundedDoctor.save().then((updatedDoctor: IDoctor) => {
                    resolve(updatedDoctor);
                }).catch((err) => {
                    console.log("Cant updatded");
                    console.log(err);
                    reject(err)
                })
            }).catch((err) => {
                reject(err);
            })
        })
    }

    getRecordByDate(id: any, startime: string, endtime: string): Promise<IRecord[]> {
        return new Promise((resolve, reject) => {
            this.recordSchema.find({ patientId: id, date: { $gte: new Date(startime), $lte: new Date(endtime) } }, (err, foundRecords) => {
                if (err) return reject(err);

                resolve(foundRecords);
            })
        })
    }

    saveRecord(record: IRecord): Promise<IRecord> {
        return new Promise((resolve, rejcet) => {
            if (Dal.day <= 30)
                record.date = new Date('2020-7-' + (Dal.day++));
            this.recordSchema.create(record, (err, newRecord: any) => {

                if (err || !newRecord) {
                    return rejcet(err);
                }
                else {
                    return resolve(newRecord);
                }


            })
        })
    }

    updatePatientLastSeen(patientId: string) {
        this.patientSchema.findByIdAndUpdate(patientId, { lastSeen: Date.now() }, (err, updatedPatient) => {
            if (err || !updatedPatient) {
                console.log(err);
                return;
            }
        })
    }


    getPatientByPhoneNumber(phoneNumber: string): Promise<IPatient> {
        return new Promise((resolve, reject) => {
            this.patientSchema.findOne({ phoneNumber: phoneNumber }, (err, foundPatient) => {
                if (err || !foundPatient) {
                    return reject(err);
                }

                resolve(foundPatient)

            }).populate("questions")
        })
    }

    deleteDoctor(doctorID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.doctorSchema.findByIdAndDelete(doctorID, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            })
        })
    }

    findAdminByID(adminID: string): Promise<IModelAdmin> {
        return new Promise((resolve, reject) => {
            this.adminSchema.findById(adminID, (err, foundedAdmin) => {
                if (err || !foundedAdmin) {
                    reject(err); return;
                }
                resolve(foundedAdmin);
            })
        })

    }
    updatePatient(patient: IPatient): Promise<IPatient> {
        return new Promise((resolve, reject) => {

            this.getPatient(patient._id).then((foundedPatient: IPatient) => {
                foundedPatient.firstName = patient.firstName;
                foundedPatient.lastName = patient.lastName;
                foundedPatient.phoneNumber = patient.phoneNumber;
                foundedPatient.endHour = patient.endHour;
                foundedPatient.startHour = patient.startHour;
                if (patient.password)
                    foundedPatient.password = patient.password;
                foundedPatient.save().then((p) => {
                    resolve(p);
                }).catch((err) => {
                    reject(err)
                });


            }).catch((err) => {
                reject(err);
            });
        })
    }


    deletePatient(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.patientSchema.findByIdAndDelete(id, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve("Delete Successfully");
                }

            })
        })
    }
    updateQuestion(question: IQuestion): Promise<IQuestion> {
        return new Promise((resolve, reject) => {
            this.questionSchema.findById(question._id, (err, foundedQuestion) => {
                if (err || !foundedQuestion) {
                    console.log(err);
                    console.log("Question Try to update but didnt found");
                    reject(err);
                    return;
                }
                foundedQuestion.questionType = question.questionType;
                if (foundedQuestion.questionType === QuestionType.Quantity) {
                    if ((!question.min || !question.max)) {
                        console.log("Question with type Quantity Must Have min and max values");
                        reject("Question with type Quantity Must Have min and max values");
                        return;
                    } else {
                        foundedQuestion.min = question.min;
                        foundedQuestion.max = question.max;
                    }
                } else {

                    delete question.min;
                    delete question.max;
                }
                question.textArr.forEach((questionTextOld: QuestionText) => {
                    foundedQuestion.textArr.forEach(questionTextNew => {
                        if (questionTextOld.language === questionTextNew.language) {
                            questionTextNew.text = questionTextOld.text
                        }
                    });
                })

                foundedQuestion.save();
                console.log(foundedQuestion);

                resolve(foundedQuestion);

            })
        })
    }



    createMedicalAdditions(medicalAdditions: IMedicalAdditions): Promise<IMedicalAdditions> {
        return new Promise((resolve, reject) => {
            this.medicalAdditionsSchema.create(medicalAdditions, (err, res: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }
    updateMedicationsOrTreatmentsToPatient(medicalAddition: IMedicalAdditions) {
        return new Promise((resolve, reject) => {
            let propertyName = medicalAddition.additionType === 0 ? 'medications' : 'treatments';
            this.patientSchema.findOneAndUpdate({ _id: medicalAddition.patientId }, { $push: { [propertyName]: medicalAddition._id } }, (err, doc) => {
                if (err) {
                    console.log('updateMedicationsOrTreatmentsToPatient', err)
                    reject();
                }
                resolve(medicalAddition);
            });
        })
    }

    getQuestionsByArrId(arrayId: string[]): Promise<IQuestion[]> {
        return new Promise((resolve, reject) => {

            this.questionSchema.find({ _id: arrayId }, (err, questions) => {
                if (err) return reject(err);

                resolve(questions);
            })

        })
    }

    findQuestionByID(questionID: string): Promise<IQuestion> {
        return new Promise((resolve, reject) => {
            this.questionSchema
                .findById(questionID, (err, foundedQuestion: IQuestion) => {
                    if (err || !foundedQuestion) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(foundedQuestion);

                })
        })
    }

    getDefaultQuestionsByID(doctorID: string): Promise<IQuestion[]> {
        return new Promise((resolve, reject) => {
            this.questionSchema.find({ isDefault: true, creatorID: doctorID }, (err, res: IQuestion[]) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }

    getDefaultQuestions(): Promise<IQuestion[]> {
        return new Promise((resolve, reject) => {
            this.questionSchema.find({ isDefault: true }, (err, res: IQuestion[]) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }


    createNewQuestion(question: IQuestion): Promise<IQuestion> {
        return new Promise((resolve, reject) => {
            this.questionSchema.create(question, (err, res: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }



    createDoctor(doctor: any): Promise<IDoctor> {
        delete doctor._id;
        return new Promise((resolve, reject) => {
            this.doctorSchema.create(doctor, (err: any, res: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }

    createPatient(patient: IPatient): Promise<IPatient> {
        return new Promise((resolve, reject) => {
            this.patientSchema.create(patient, (err, res: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }


    getPatient(patientId: string): Promise<IPatient> {
        return new Promise((resolve, reject) => {
            this.patientSchema.findOne({ _id: patientId }, (err, res: IPatient) => {
                if (err || !res) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            }).populate("questions").populate("treatments").populate("medications")
        })
    }

    getAllDoctorPatients(doctorId: string) {
        return new Promise((resolve, reject) => {
            this.patientSchema.find({ creatorID: doctorId }, (err, res: IPatient[]) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }

    getDoctors() {
        return new Promise((resolve, reject) => {
            this.doctorSchema.find((err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }

    getDoctorsByAdminID(adminID: string): Promise<IDoctor[]> {
        return new Promise((resolve, reject) => {
            this.doctorSchema.find({ creatorID: adminID }, (err, doctors: IDoctor[]) => {
                if (err || !doctors || !doctors.length) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(doctors);
            })
        })
    }

    getDoctor(doctorId: string): Promise<IDoctor> {
        return new Promise((resolve, reject) => {
            this.doctorSchema.findById(doctorId, (err, foundedDoctor: IDoctor) => {
                if (err || !foundedDoctor) {
                    reject("Doctor Not Found");
                    return;
                }
                resolve(foundedDoctor);
            })
        })
    }

    getDoctorByLogin(username: string, password: string): Promise<IDoctor> {
        return new Promise((resolve, reject) => {
            this.doctorSchema.findOne({
                username,
                password
            }, (err, res: IDoctor) => {
                if (err) {
                    console.log(err)
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }
    getAdminByLogin(username: string, password: string): Promise<IModelAdmin> {
        return new Promise((resolve, reject) => {

            this.adminSchema.findOne({
                username,
                password
            }, (err, admin: IModelAdmin) => {
                if (err || !admin) {
                    console.log(err)
                    reject(err);
                    return;
                }
                resolve(admin);
            })
        })
    }
    // name: string;
    // description: string;
    // creatorId?: string;
    // patientId?: string;
    // additionType: AddPopupType;
    updateMedical(med: IMedicalAdditions): Promise<IMedicalAdditions> {
        return new Promise((resolve, reject) => {
            this.medicalAdditionsSchema.findById(med._id, (err, foundedMedical) => {
                if (err || !foundedMedical) {
                    reject(err);
                    return;
                }
                foundedMedical.name = med.name;
                foundedMedical.description = med.description;
                foundedMedical.save();
                resolve(foundedMedical);
            })
        })
    }
    deleteMedical(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.medicalAdditionsSchema.findByIdAndDelete(id, (err) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve();
            })
        })
    }


}


