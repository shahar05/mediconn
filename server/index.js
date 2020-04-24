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

mongoose.connect('mongodb://localhost:27017/demo_shiba', { useNewUrlParser: true });
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);   
    next();
});

// =========== Authentication-routes =========
//app.use(authenticationRoute);
//============= Admin Routes =============
 app.use(adminRoute);
// ========== Doctor Routes ==========
app.use(doctorRoute);
// ========== Patient Routes ==========
app.use(patientRoute);
// ========== Question Routes ==========
app.use(questionRoute);



app.get("*", function (req, res) {
    console.log("SomeOne hit the star Route");
    res.send("you hit the * route");
});

app.post("*", function (req, res) {
    console.log("SomeOne hit the star Route");
    res.send("you hit the * route");
});

app.listen(3000 ,function (req, res) {
    console.log("server up!");    
});



