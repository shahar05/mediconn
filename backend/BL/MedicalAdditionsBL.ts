import { Dal } from "../DAL/dal"
import { IAdmin, IModelAdmin, IMedicalAdditions } from '../models';

export class MedicalAdditionsBL {
    private static dal: Dal = new Dal();


    deleteMedical(id: string):Promise<any> {
        return new Promise((resolve, reject) => {
            MedicalAdditionsBL.dal.deleteMedical(id).then(()=>{
                resolve();
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    updateMedical(med :IMedicalAdditions ):Promise<IMedicalAdditions> {
        return new Promise((resolve, reject) => {
            MedicalAdditionsBL.dal.updateMedical(med).then((med :IMedicalAdditions)=>{
                    resolve(med);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    createMedicalAddition(medicalAddition: IMedicalAdditions) {
        return new Promise((resolve, reject) => {
            MedicalAdditionsBL.dal.createMedicalAdditions(medicalAddition).then((res: IMedicalAdditions) => {
                console.log('=========>', res)
                MedicalAdditionsBL.dal.updateMedicationsOrTreatmentsToPatient(res).then((response) => {
                    resolve(response)
                    return;
                }).catch((err) => {
                    console.log('createMedicalAdditions 11 ');
                    console.log(err);
                    reject(err);
                })

            }).catch((err) => {
                console.log('createMedicalAdditions   22222', err);
                reject(err);
            })
        })
    }
} 