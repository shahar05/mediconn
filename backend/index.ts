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


const accountSid = 'AC5002ae0ed4bc55d2651e5ff42de9149f';
const authToken = '8b4c3726ad9b8784d17169f6f56576e7';
const client = require('twilio')(accountSid, authToken);

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
            // if(  req.originalUrl !== "/api/doctor/current")


              console.log(req.originalUrl );
               
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            console.log(ip); 
            next();
        });
    }
 
    private sendSMS(){
        // Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure


client.messages//972 52-333-0411
  .create({
     body: 'Hi juli how are you doing today?',
     from: '+12569738305',
     to: '+9720523330411'
   })
  .then((message: { sid: any; }) => console.log(message.sid));


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
            this.sendSMS();
            console.log("Boooom");
            res.send('bye');  
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