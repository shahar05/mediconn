import jwt, { VerifyErrors } from 'jsonwebtoken';

var env = require('../env.json')

export abstract class Authenticate {

    static createToken(user: any) {
        var token = jwt.sign({
            user,
        }, env.secret, { expiresIn: '1h' });

        return token;
    }

    static deserializeObject(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, env.secret, (err: any, decodedObj: any) => {
                if (err) {          
                    reject(err);
                    return;
                }

                resolve(decodedObj);
            });
        });
    }
}