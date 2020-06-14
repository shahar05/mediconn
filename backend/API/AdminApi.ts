import { BaseApi } from "./BaseApi";
import { Router } from "express";
import { AdminBL } from "../BL/adminBL";
import { IDoctor } from "../models";

export class AdminApi implements BaseApi {
    public router: Router;
    private adminBL: AdminBL;
    constructor() {
        this.router = Router();
        this.adminBL = new AdminBL();
        this.initRoutes();
    }

    initRoutes(): void {

        this.router.put('/admin/doctor', (req, res) => {
            let doctor: IDoctor = req.body;
            this.adminBL.updateDoctor(doctor).then((updatedDoctor: IDoctor) => {
                res.send(updatedDoctor);
            }).catch((err) => {
                res.status(400).send(err);
            })
        })

        this.router.delete('/admin/doctor/:id', (req, res) => {
                let doctorID = req.params.id;
                this.adminBL.deleteDoctor(doctorID).then(()=>{
                        res.status(204).send();
                }).catch((err)=>{
                    res.status(400).send(err);
                })
        })

        this.router.post('/admin/doctor', (req, res) => {
            let doctor: IDoctor = req.body;
            this.adminBL.createDoctor(doctor).then((newDoctor: IDoctor) => {
                res.status(201).send(newDoctor);
            }).catch((err) => {
                res.status(400).send(err);
            })
        })

        this.router.get('/admin/:id/doctor', (req, res) => {
            this.adminBL.getDoctors(req.params.id).then((doctors: IDoctor[]) => {
                res.send(doctors);
            }).catch((err) => {
                console.log(err);
                console.log("wtf");

                res.status(400).send(err);
            })
        })

    }

}