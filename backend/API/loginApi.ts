import { Router, Request, Response } from "express";
import { DoctorBL } from '../BL/doctorBL';
import { AdminBL } from "../BL/adminBL";
import { Authenticate } from "../Helpers/authenticationHelper";
import { BaseApi } from "./BaseApi";

export class LoginApi implements BaseApi {
    public router: Router;
    private adminBL: AdminBL = new AdminBL();
    private doctorBL: DoctorBL = new DoctorBL();
    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    private createToken(obj: any) {
        return Authenticate.createToken(obj)
    }

    private loginAdmin(req: Request, res: Response) {
        this.adminBL.login(req.body).then((admin) => {
            res.send({ token: this.createToken(admin), isLogin: true, type: "admin", object: admin })

        }).catch(err => {
            res.status(401).send({ isLogin: false, response: "doctor not found" });
        })
    }
    private loginDoctor(req: Request, res: Response) {
        this.doctorBL.login(req.body).then((doctor) => {
            res.send({ token: this.createToken(doctor), isLogin: true, type: "doctor", object: doctor })
        }).catch(err => {
            res.status(401).send({ isLogin: false, response: "doctor not found" });
        })

    }
    initRoutes() {
        this.router.post('/login', (req: Request, res: Response) => {
            if (req.body.user === 'admin') {
                this.loginAdmin(req, res);
            } else if (req.body.user === "doctor") {
                this.loginDoctor(req, res);
            } else {
                res.status(400).send({ isLogin: false, response: "Type of Request is Missing" })
            }
        })
    }
}