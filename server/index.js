var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var getIP = require('ipware')().get_ip;
const app = express();

const adminRoute = require("./routes/admin");
const doctorRoute = require("./routes/doctor");
const patientRoute = require("./routes/patient");
const questionRoute = require("./routes/question");
const authenticationRoute = require("./routes/authentications");
const treatmentRoute = require("./routes/treatments");
const medicationRoute = require("./routes/medications");
const Authenticate = require('./AuthenticationHandler/Authentication');

var env = require('./env.json')

var jwt = require('express-jwt');

mongoose.connect(env.mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));



app.use((req, res, next) => {
    if (req.url.includes('login')) {
        next();
        return;
    }
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const userToken = req.headers.authorization.split(' ')[1];
        Authenticate.deserializeObject(userToken).then((res) => {
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
// ========== Treatment Routes ==========
app.use(treatmentRoute);
// ========== Medication Routes ==========
app.use(medicationRoute);


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



