"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginRouter = express_1.default.Router();
loginRouter.post('/', (req, res) => {
    const { username, password } = req.body;
    if (password === process.env.SEC_PASSWORD) {
        const token = jsonwebtoken_1.default.sign(username, process.env.TOKEN_KEY);
        console.log(`${username} logged in`);
        res.json(token);
    }
    else {
        console.log(`Väärä salasana, ${username} / ${password}`);
        res.status(401).end();
    }
});
exports.default = loginRouter;
