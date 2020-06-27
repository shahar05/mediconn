import { Dal } from "../DAL/dal"
import { IDoctor, IPatient } from '../models';

export class DoctorBL {
    private static dal: Dal = new Dal();


    getUser() {
        return new Promise((resolve, reject) => {
            DoctorBL.dal.getDoctors().then((res) => {
                resolve(res)
            })
        })
    }

    getDoctor(doctorId: string): Promise<IDoctor> {
        return new Promise((resolve, reject) => {
            DoctorBL.dal.getDoctor(doctorId).then((res: IDoctor) => {
                resolve(res);
            }).catch((err) => {
                reject(err);

            })
        })
    }

    getAllDoctorPatients(doctorId: string): Promise<IPatient[]> {
        return new Promise((resolve, reject) => {
            DoctorBL.dal.getAllDoctorPatients(doctorId).then((res: any) => {
                resolve(res);
            })
        })
    }

    login(doctor: IDoctor) {
        return new Promise((resolve, reject) => {
            DoctorBL.dal.getDoctorByLogin(doctor.username, doctor.password).then((res: IDoctor) => {
                if (res) {
                    return resolve(res)
                }
                return reject('No Result Found')
            })
        })
    }

} 