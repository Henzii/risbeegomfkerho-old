import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { Credentials } from '../types';
const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
    const { username, password } = req.body as Credentials;
    if (password === process.env.SEC_PASSWORD) {
        const token = jwt.sign(username, process.env.TOKEN_KEY as Secret);
        console.log(`${username} logged in`);
        res.json(token);
    } else {
        console.log(`Väärä salasana, ${username} / ${password}`);
        res.status(401).end();
    }
});
export default loginRouter;
