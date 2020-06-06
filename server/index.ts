import { Application, Express, Request, Response, NextFunction } from 'express';
import { User } from './models';
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const getIP = require('ipware')().get_ip;

const app: Application = express();

const adminRoute = require("./routes/admin");
const doctorRoute = require("./routes/doctor");
const patientRoute = require("./routes/patient");
const questionRoute = require("./routes/question");
const authenticationRoute = require("./routes/authentications");
const medicalAdditions = require("./routes/medicalAdditions");
const Authenticate = require('./AuthenticationHandler/Authentication');

const env = require('./env.json')

const jwt = require('express-jwt');

mongoose.connect(env.mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));


app.use((req: any, res: Response, next: NextFunction) => {
    if (req.url.includes('login')) {
        next();
        return;
    }
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const userToken = req.headers.authorization.split(' ')[1];
        Authenticate.deserializeObject(userToken).then((res: { user: User }) => {
            req['user'] = res.user
            next();
            return;
        }).catch(() => {
            res.send(401);
        })
    } else {
        res.send(401);
    }
});





// =========== Authentication-routes =========

app.use(authenticationRoute);
//============= Admin Routes =============
app.use(adminRoute);
// ========== Doctor Routes ==========
app.use(doctorRoute);
// ========== Patient Routes ==========
app.use(patientRoute);
// ========== Question Routes ==========
app.use(questionRoute);
// ========== Medication Routes ==========
app.use(medicalAdditions);


app.get("*", function (req, res) {
    console.log("SomeOne hit the star Route");

    res.send("you hit the * route");
});

app.post("*", function (req, res) {
    console.log("SomeOne hit the star Route");
    res.status(400).send("you hit the * route");
});

app.listen(3000, function (req, res) {
    console.log("server up!");
});



