import { Dal } from "../DAL/dal"
import { IAdmin, IModelAdmin, IMedicalAdditions } from '../models';

export class MedicalAdditionsBL {
    private static dal: Dal = new Dal();
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