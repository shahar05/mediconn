const jwt = require('jsonwebtoken');
const jwtKey = "NJxe+Xn+hshj6tIH63/FjQ0nuQp699C+ZsmdLvqYanngf4zHzMq9rOcUp6EPNEzkyyFLFjFehLxgk+Jnfmjbg==";

 class Authenticate {

    static createToken(object) {
        let token = jwt.sign(object, jwtKey);
        return token;
    }

    static deserializeObject(token) {
        return new Promise((resolve, reject) => {
        
            jwt.verify(token, jwtKey, (err, decodedObj) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(decodedObj);
                
            });

        });
    }
}
module.exports = Authenticate;