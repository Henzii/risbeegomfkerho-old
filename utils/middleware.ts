import { Request, Response, NextFunction } from 'express';
import { ReqWithUser } from '../types';
import jwt, { Secret } from 'jsonwebtoken';

export const puhuja = (req: ReqWithUser, _res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} ${req.user} ${req.ip}`);
    next();
};
export const userExtractor = (req: ReqWithUser, _res: Response, next: NextFunction) => {
    const auth = req.get('authorization')?.slice(7) as string;
    if (auth !== null && auth !== '') {
        try {
            const user = jwt.verify(auth, process.env.TOKEN_KEY as Secret) as string || null;
            req.user = user;
        } catch (e) {
            req.user = null;
        }
    }
    next();
};
export const requireLogin = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const auth = req.get('authorization')?.slice(7) as string;
        try {
            jwt.verify(auth, process.env.TOKEN_KEY as Secret) as string;
            next();
        } catch (e) {
            console.log(`${req.method} ${req.path} Epäkelpo token, estetty!`);
            res.status(401).end();
        }
    };
};
export const forceHTTPS = (req: Request, res: Response, next: NextFunction) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === "production")
        res.redirect(`https://${req.header('host')}${req.url}`);
    else
        next();
};