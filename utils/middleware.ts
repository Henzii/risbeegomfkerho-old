import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export const puhuja = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} ${req.ip}`);
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