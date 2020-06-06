"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var getIP = require('ipware')().get_ip;
var app = express();
var adminRoute = require("./routes/admin");
var doctorRoute = require("./routes/doctor");
var patientRoute = require("./routes/patient");
var questionRoute = require("./routes/question");
var authenticationRoute = require("./routes/authentications");
var medicalAdditions = require("./routes/medicalAdditions");
var Authenticate = require('./AuthenticationHandler/Authentication');
var env = require('./env.json');
var jwt = require('express-jwt');
mongoose.connect(env.mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
    if (req.url.includes('login')) {
        next();
        return;
    }
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var userToken = req.headers.authorization.split(' ')[1];
        Authenticate.deserializeObject(userToken).then(function (res) {
            req['user'] = res.user;
            next();
            return;
        }).catch(function () {
            res.send(401);
        });
    }
    else {
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
