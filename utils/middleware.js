"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceHTTPS = exports.requireLogin = exports.puhuja = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const puhuja = (req, _res, next) => {
    console.log(`${req.method} ${req.path} ${req.ip}`);
    next();
};
exports.puhuja = puhuja;
const requireLogin = () => {
    return (req, res, next) => {
        var _a;
        const auth = (_a = req.get('authorization')) === null || _a === void 0 ? void 0 : _a.slice(7);
        try {
            jsonwebtoken_1.default.verify(auth, process.env.TOKEN_KEY);
            next();
        }
        catch (e) {
            console.log(`${req.method} ${req.path} Epäkelpo token, estetty!`);
            res.status(401).end();
        }
    };
};
exports.requireLogin = requireLogin;
const forceHTTPS = (req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === "production")
        res.redirect(`https://${req.header('host')}${req.url}`);
    else
        next();
};
exports.forceHTTPS = forceHTTPS;
