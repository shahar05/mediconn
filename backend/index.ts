import { Application } from "express";
import express from 'express';
import bodyParser from "body-parser";
import { DoctorApi } from "./API/doctorApi";
import { LoginApi } from "./API/loginApi";
import { authMiddleware } from "./Middleware/authMiddleware";
import { PatientApi } from "./API/patientApi";
import { QuestionApi } from "./API/QuestionApi";
import { MedicalAdditionsBL } from "./BL/MedicalAdditionsBL";
import { MedicalAdditionsApi } from "./API/MedicalAdditionsApi";

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
    }

    private initNotGuardedRoutes() {
        this.app.use('/api', new LoginApi().router)
    }

    private initGuardedRoutes() {
        this.app.use('/api', authMiddleware, new DoctorApi().router)
        this.app.use('/api', authMiddleware, new PatientApi().router)
        this.app.use('/api', authMiddleware, new QuestionApi().router)
        this.app.use('/api', authMiddleware, new MedicalAdditionsApi().router)

    }

    private initTestRoute() {
        this.app.get('/', (req, res) => {
            res.send('Hello World')
        })
    }

    public start() {
        this.app.listen(3000, () => {
            console.log('Server is up and running');
        })
    }
}


const server = new Server();
server.start();