import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { Credentials, Peli } from './types';
import jwt, { Secret } from 'jsonwebtoken';
import multer from 'multer';
import { parseUploadedFile } from './utils/parseUploadedFile';
import mongoose from 'mongoose';
import PeliModel from './models/PeliModel';
import HandicapListModel from './models/HandicapListModel';

import { calculateHandicaps } from './utils/calculateHandicaps';


const app = express();
let user = 'Unknown';

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, './data'),
    filename: (_req, _file_, cb) => cb(null, `${user}.csv`)
});
const upload = multer({ storage: storage });

dotenv.config();

app.use(cors());
app.use(express.json());

// Heroku force https
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`);
        else
            next();
    });
}
app.use(express.static('build'));
app.post('/login', (req, res) => {

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
//////////////////////////////////////////////////////////////
// !! Tästä eteenpäin 401:stä jos ei ole validia tokenia !! //
//////////////////////////////////////////////////////////////
app.use((req, res, next) => {
    const auth = req.get('authorization')?.slice(7) as string;
    try {
        user = jwt.verify(auth, process.env.TOKEN_KEY as Secret) as string;
        console.log(`${req.secure} ${req.method} ${req.path} ${user}`);
        next();
    } catch (e) {
        console.log(`${req.secure} ${req.method} ${req.path} Epäkelpo token, estetty! (${user})`);
        res.status(401).end();
    }
});
app.get('/api/calculateHandicaps', (_req, res) => {
    console.log('Haetaan pelejä...');
    PeliModel.find({}).sort({ date: 1 }).then(pelit => {
        const hoocee = calculateHandicaps(pelit as unknown as Array<Peli>);
        res.json( hoocee );
        console.log('Tuhotaan hc-listaa tietokannasta...');
        HandicapListModel.deleteMany({}).then(() => {
            console.log('OK!\nLisätään uutta hc-taulua tietokantaan...');
            HandicapListModel.insertMany(hoocee.hcTable)
                .then(() => console.log('OK!'))
                .catch(e => console.log('Virhe!', e));

        }).catch(e => console.log('Virhe!', e));

    }).catch(e => {
        res.status(401).send(e);
    });
    
});
app.get('/api/games', (_req, res) => {
    PeliModel.find({}).sort({ date: 1 }).then(pelit => {
        const { matches } = calculateHandicaps(pelit as unknown as Array<Peli>);
        res.json( matches);
    }).catch(e => {
        res.status(401).send(e);
    });
});
app.get('/api/hc', (_req, res) => {
    PeliModel.find({}).sort({ date: 1 }).then(pelit => {
        const { hcTable } = calculateHandicaps(pelit as unknown as Array<Peli>);
        res.json( hcTable );
    }).catch(e => {
        res.status(401).send(e);
    });
});
app.post('/upload', upload.single('filu'), async (_req, res) => {
    const { pelit, ignored } = await parseUploadedFile(`./data/${user}.csv`, user);
    const lisatty = { uusia: 0, duplikaatteja: 0 };
    console.log('Received file from ' + user);
    console.log('Inserting to db...');
    PeliModel.insertMany(pelit, { ordered: false }).then((res) => {
        console.log('Ok, lisätty kaikki', res.length);
        lisatty.uusia = res.length;
    }).catch(e => {
        console.log('Virhe! Lisätty:', e.result.result.nInserted, ", duplikaatteja:", e.result.result.writeErrors.length);
        lisatty.uusia = e.result.result.nInserted as number;
        lisatty.duplikaatteja = e.result.result.writeErrors.length as number;
    }).finally(()=> {
        res.send({ ...ignored, ...lisatty });
    });
});

mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log('yhdistetty tietokantaan');
}).catch(e => {
    console.log('Virhe yhdistettäessä tietokantaan! ', e.message);
});

const PORT = process.env.PORT || 3001;
console.log('Portissa ' + PORT);
app.listen(PORT);

