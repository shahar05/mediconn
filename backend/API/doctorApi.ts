import { Router, Request, Response } from "express";
import { DoctorBL } from '../BL/doctorBL';
import { BaseApi } from "./BaseApi";
import { IDoctor, IAdmin, IModelAdmin } from '../models';
import { AdminBL } from "../BL/adminBL";

export class DoctorApi implements BaseApi {
    public router: Router;
    private adminBL: AdminBL;
    private doctorBL: DoctorBL;
    constructor() {
        this.router = Router();
        this.doctorBL = new DoctorBL();
        this.adminBL = new AdminBL();
        this.initRoutes();
    }

    initRoutes() {


        this.router.get('/doctor/:id/patient', (req: Request, res: Response) => {
            //let doctorId = <any>req.params.id;
            let doctorId = req.params.id;
            this.doctorBL.getAllDoctorPatients(doctorId).then((data) => {
                res.send(data);
                return;
            }).catch((err)=>{
                    console.log(err);
                    res.sendStatus(400).send(err);
            })
        })


        //TODO: if is admin login then dont lookup for doctor
        this.router.get('/doctor/current', (req: Request, res: Response) => {
            let request: any = req
            let user: IDoctor = request.user;
            
            console.log( request.user);


            this.doctorBL.getDoctor(user._id).then((data) => {
                res.send(data);
                return;

            }).catch((err)=>{

                this.adminBL.getAdmin(request.user._id)
                .then((admin)=>{             
                return     res.send(admin);
                }).catch((err)=>{                 
                    return  res.status(401).send(err)    
                })

            })
        })

        this.router.get('/doctor', (req: Request, res: Response) => {
            this.doctorBL.getUser().then((data) => {
                res.send(data);
                return;

            }).catch((err)=>{console.log(err);
            })
        })

    }
}