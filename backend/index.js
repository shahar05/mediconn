"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var doctorApi_1 = require("./API/doctorApi");
var loginApi_1 = require("./API/loginApi");
var authMiddleware_1 = require("./Middleware/authMiddleware");
var patientApi_1 = require("./API/patientApi");
var QuestionApi_1 = require("./API/QuestionApi");
var MedicalAdditionsApi_1 = require("./API/MedicalAdditionsApi");
var AdminAPI_1 = require("./API/AdminAPI");
var PhoneApi_1 = require("./API/PhoneApi");
var accountSid = 'AC5002ae0ed4bc55d2651e5ff42de9149f';
var authToken = '8b4c3726ad9b8784d17169f6f56576e7';
var client = require('twilio')(accountSid, authToken);
var cors = require('cors');
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.initTestRoute();
        this.initNotGuardedRoutes();
        this.initGuardedRoutes();
    }
    Server.prototype.config = function () {
        this.app.use(cors({ origin: true }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(function (req, res, next) {
            // if(  req.originalUrl !== "/api/doctor/current")
            console.log(req.originalUrl);
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            console.log(ip);
            next();
        });
    };
    Server.prototype.sendSMS = function () {
        // Download the helper library from https://www.twilio.com/docs/node/install
        // Your Account Sid and Auth Token from twilio.com/console
        // DANGER! This is insecure. See http://twil.io/secure
        client.messages //972 52-333-0411
            .create({
            body: 'Hi juli how are you doing today?',
            from: '+12569738305',
            to: '+9720523330411'
        })
            .then(function (message) { return console.log(message.sid); });
    };
    Server.prototype.initNotGuardedRoutes = function () {
        this.app.use('/api', new loginApi_1.LoginApi().router);
        this.app.use('/api', new PhoneApi_1.PhoneApi().router);
    };
    Server.prototype.initGuardedRoutes = function () {
        this.app.use('/api', authMiddleware_1.authMiddleware, new AdminAPI_1.AdminApi().router);
        this.app.use('/api', authMiddleware_1.authMiddleware, new doctorApi_1.DoctorApi().router);
        this.app.use('/api', authMiddleware_1.authMiddleware, new patientApi_1.PatientApi().router);
        this.app.use('/api', authMiddleware_1.authMiddleware, new QuestionApi_1.QuestionApi().router);
        this.app.use('/api', authMiddleware_1.authMiddleware, new MedicalAdditionsApi_1.MedicalAdditionsApi().router);
    };
    Server.prototype.initTestRoute = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            _this.sendSMS();
            console.log("Boooom");
            res.send('bye');
        });
    };
    Server.prototype.start = function () {
        this.app.listen(8830, function () {
            console.log('Server is up and running');
        });
    };
    return Server;
}());
var server = new Server();
server.start();
