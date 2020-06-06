import { Request, Response, NextFunction } from "express";
import { Authenticate } from "../Helpers/authenticationHelper";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var userToken = req.headers.authorization.split(' ')[1];
        Authenticate.deserializeObject(userToken).then((res: any) => {
            req['user'] = res.user;
            next();
            return;
        }).catch(() => {
            res.send(401);
        });
    }
    else {
        res.send(401);
    }
}