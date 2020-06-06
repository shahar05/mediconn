import { DoctorSchema } from './../Models/DoctorModel';
import mongoose, { Connection, Schema, Model } from 'mongoose';
import { IDoctor, IAdmin, IModelAdmin, IPatient, IQuestion, IMedicalAdditions } from '../models';
import { AdminSchema } from '../Models/AdminModel';
import { PatientSchema } from '../Models/PatientModel';
import { QuestionSchema } from '../Models/QuestionModel';
import { MedicalAdditionsSchema } from '../Models/MedicalAdditionsModel';

var env = require('../env.json');


export class Dal {
    private static connection: Connection;

    //Schemas
    private doctorSchema: Model<IDoctor> = mongoose.model('Doctor', DoctorSchema);
    private adminSchema: Model<IModelAdmin> = mongoose.model('Admin', AdminSchema);
    private patientSchema: Model<IPatient> = mongoose.model('Patient', PatientSchema);
    private questionSchema: Model<IQuestion> = mongoose.model('question', QuestionSchema);
    private medicalAdditionsSchema: Model<IMedicalAdditions> = mongoose.model('MedicalAdditions', MedicalAdditionsSchema);

    constructor() {
        mongoose.connect(env.mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true }).then((mongoose) => {
            mongoose.set('useCreateIndex', true);
        });
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


    getPatientQuestions(patientId: string) {

        return new Promise((resolve, reject) => {
            this.questionSchema.find({ isDefault: true }, (err, res: IPatient) => {
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


    setDefaultQuestions(question: IQuestion) {
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


    getPatient(patientId: string) {
        return new Promise((resolve, reject) => {
            this.patientSchema.findOne({ _id: patientId }, (err, res: IPatient) => {
                if (err) {
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

    getDoctor(doctorId: string): Promise<IDoctor> {
        return new Promise((resolve, reject) => {
            this.doctorSchema.findOne({ _id: doctorId }, (err, res: IDoctor) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(res);
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
    getAdminByLogin(username: string, password: string, hospitalName: string): Promise<IModelAdmin> {
        return new Promise((resolve, reject) => {

            this.adminSchema.findOne({
                username,
                hospitalName,
                password
            }, (err, res: IModelAdmin) => {
                if (err) {
                    console.log(err)
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }


}


