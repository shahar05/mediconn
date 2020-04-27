var Authenticate = require('../AuthenticationHandler/Authentication')


function JWTTester(req, res, next) {
    let token = req.headers['token'];

    Authenticate.deserializeObject(token).then((obj) => {
        delete obj.password;
        req.user = obj;
        next();
    }).catch((err)=>{
        console.log("========== No LoggodIn User Try to do UnAUthorized request ========");
        res.status(401).send({ err : err.message });
     
    })
}

module.exports = JWTTester;