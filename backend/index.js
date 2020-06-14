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
            if (req.originalUrl !== "/api/doctor/current")
                console.log(req.originalUrl);
            // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            // console.log(ip); 
            next();
        });
    };
    Server.prototype.initNotGuardedRoutes = function () {
        this.app.use('/api', new loginApi_1.LoginApi().router);
    };
    Server.prototype.initGuardedRoutes = function () {
        this.app.use('/api', authMiddleware_1.authMiddleware, new AdminAPI_1.AdminApi().router);
        this.app.use('/api', authMiddleware_1.authMiddleware, new doctorApi_1.DoctorApi().router);
        this.app.use('/api', authMiddleware_1.authMiddleware, new patientApi_1.PatientApi().router);
        this.app.use('/api', authMiddleware_1.authMiddleware, new QuestionApi_1.QuestionApi().router);
        this.app.use('/api', authMiddleware_1.authMiddleware, new MedicalAdditionsApi_1.MedicalAdditionsApi().router);
    };
    Server.prototype.initTestRoute = function () {
        this.app.get('/', function (req, res) {
            res.send();
        });
    };
    Server.prototype.start = function () {
        this.app.listen(3000, function () {
            console.log('Server is up and running');
        });
    };
    return Server;
}());
var server = new Server();
server.start();
