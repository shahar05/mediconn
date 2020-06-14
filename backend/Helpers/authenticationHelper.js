"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var env = require('../env.json');
var Authenticate = /** @class */ (function () {
    function Authenticate() {
    }
    Authenticate.createToken = function (user) {
        var token = jsonwebtoken_1.default.sign({
            user: user,
        }, env.secret, { expiresIn: '1h' });
        return token;
    };
    Authenticate.deserializeObject = function (token) {
        return new Promise(function (resolve, reject) {
            jsonwebtoken_1.default.verify(token, env.secret, function (err, decodedObj) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(decodedObj);
            });
        });
    };
    return Authenticate;
}());
exports.Authenticate = Authenticate;
