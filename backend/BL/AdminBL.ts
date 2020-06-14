import { Dal } from "../DAL/dal"
import { IAdmin, IModelAdmin, IDoctor } from '../models';
import { Language } from "../enums";

export class AdminBL {


    private static dal: Dal = new Dal();

    updateDoctor(doctor: IDoctor):Promise<IDoctor> {
        return new Promise((resolve , reject)=>{
            AdminBL.dal.updateDoctor(doctor).then((updatedDoctor : IDoctor)=>{
                resolve(updatedDoctor);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    deleteDoctor(doctorID : string) : Promise<IDoctor>{
        return new Promise((resolve , reject)=>{
            AdminBL.dal.deleteDoctor(doctorID).then(()=>{
                resolve();
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    login(admin: IAdmin) {
        return new Promise((resolve, reject) => {
            AdminBL.dal.getAdminByLogin(admin.username, admin.password)
            .then((res: IModelAdmin) => {
                resolve(res)
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    createDoctor(doctor: IDoctor): Promise<IDoctor> {
        return new Promise( (resolve , reject )=>{
            AdminBL.dal.findAdminByID(doctor.creatorID).then((foundedAdmin:IModelAdmin)=>{
                if( !this.languageContainMainLanguge( doctor.mainLanguage , doctor.languages ) ){
                    reject("languages does not contain main language ");
                    
                }
                AdminBL.dal.createDoctor(doctor).then((newDoctor : IDoctor)=>{
                    resolve(newDoctor);
                }).catch((err)=>{
                    reject(err)
                })
            }).catch((err)=>{
                reject(err);
            })

        } )
    }
    languageContainMainLanguge(mainLanguage: Language, languages: Language[]):boolean {
            return !!languages.find( lang=> lang === mainLanguage  );
    }

    getDoctors(adminID : string) : Promise<IDoctor[]> {
        return new Promise( (resolve , reject)=>{
            AdminBL.dal.getDoctorsByAdminID(adminID).then((doctors : IDoctor[])=>{
                resolve(doctors);
            }).catch((err)=>{
                reject(err);
            })
        })
    }


} 