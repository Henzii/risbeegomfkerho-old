import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mongoose from 'mongoose';
import gameApiRouter from './controllers/gameApi';
import uploadRouter from './controllers/upload';
import loginRouter from './controllers/login';
import { puhuja, requireLogin, forceHTTPS, userExtractor } from './utils/middleware';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Heroku force https
app.use(forceHTTPS);
app.use(userExtractor);
app.use(puhuja);
app.use(express.static('build'));

app.use('/login', loginRouter);
app.use('/api', requireLogin(), gameApiRouter);
app.use('/upload', requireLogin(), uploadRouter);



mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log('yhdistetty tietokantaan');
}).catch(e => {
    console.log('Virhe yhdistettäessä tietokantaan! ', e.message);
});

const PORT = process.env.PORT || 3001;
console.log('Portissa ' + PORT);
app.listen(PORT);

