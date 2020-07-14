import { Application } from "express";
import express from 'express';
import bodyParser from "body-parser";
import { DoctorApi } from "./API/doctorApi";
import { LoginApi } from "./API/loginApi";
import { authMiddleware } from "./Middleware/authMiddleware";
import { PatientApi } from "./API/patientApi";
import { QuestionApi } from "./API/QuestionApi";
import { MedicalAdditionsApi } from "./API/MedicalAdditionsApi";
import { AdminApi } from "./API/AdminAPI";
import{ PhoneApi } from "./API/PhoneApi";

const cors = require('cors')

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.initTestRoute();
        this.initNotGuardedRoutes();
        this.initGuardedRoutes();
    }

    private config() {
        this.app.use(cors({ origin: true }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use((req, res, next)=> {
            if(  req.originalUrl !== "/api/doctor/current")
              console.log(req.originalUrl );
               
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            console.log(ip); 
            next();
        });
    }
 

    private initNotGuardedRoutes() {
        this.app.use('/api', new LoginApi().router)
        this.app.use('/api', new PhoneApi().router)
    }

    private initGuardedRoutes() {
        this.app.use('/api', authMiddleware, new AdminApi().router)
        this.app.use('/api', authMiddleware, new DoctorApi().router)
        this.app.use('/api', authMiddleware, new PatientApi().router)
        this.app.use('/api', authMiddleware, new QuestionApi().router)
        this.app.use('/api', authMiddleware, new MedicalAdditionsApi().router)

    }

    private initTestRoute() {
        this.app.get('/', (req, res) => {
            console.log("Boooom");

            res.send('hi');  
        })
    }

    public start() {
        this.app.listen(8830, () => {
            console.log('Server is up and running');
        })
    }
}


const server = new Server();
server.start();