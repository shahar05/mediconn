const jwt = require('jsonwebtoken');

var env = require('../env.json')

class Authenticate {

    static createToken(user) {
        var token = jwt.sign({
            data: user
        }, env.secret, { expiresIn: '3h' });

        return token;
    }

    static deserializeObject(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, env.secret, (err, decodedObj) => {
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