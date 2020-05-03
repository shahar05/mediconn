var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var getIP = require('ipware')().get_ip;
const app = express();

var nJwt = require('njwt');


const adminRoute = require("./routes/admin");
const doctorRoute = require("./routes/doctor");
const patientRoute = require("./routes/patient");
const questionRoute = require("./routes/question");
const authenticationRoute = require("./routes/authentications");
const treatmentRoute = require("./routes/treatments");
const medicationRoute = require("./routes/medications");
const SECRET = 'Matanishereeeee';
var jwt = require('express-jwt');

mongoose.connect('mongodb://localhost:27017/demo_shiba', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
    next();
});


 
  
//   app.get('/', middleware.checkToken, handlers.index);

app.use(jwt({
    secret: SECRET,
    credentialsRequired: false,

    getToken: function fromHeaderOrQuerystring(req) {
        console.log('----------------------------------------------------------------------')
        console.log(req.headers.authorization)
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            console.log('req.headers.authorization',req.headers.authorization)
            let d = nJwt.verify(req.headers.authorization.split(' ')[1],SECRET);
            console.log(d)

            return req.headleters.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        
    },

}).unless({ path: ['/login'] }));


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



