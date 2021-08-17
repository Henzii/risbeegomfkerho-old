import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rawData from './data/games.json';
import { Credentials, JSONdata } from './types';
import jwt, { Secret } from 'jsonwebtoken';
import multer from 'multer';
import { parseUploadedFile } from './utils/parseUploadedFile';

const app = express();
let user = 'Unknown';

let gameData: JSONdata;

if ('games' in rawData || 'hc' in rawData) gameData = rawData as JSONdata;
else gameData = { games: [], hc: []};

const storage = multer.diskStorage({
    destination: (_req,_file,cb) => cb(null,'./data'),
    filename: (_req,_file_,cb) => cb(null,`${user}.csv`)
});
const upload = multer( {storage: storage} );

dotenv.config();

app.use(cors());
app.use(express.json());

// Heroku force https
if(process.env.NODE_ENV === 'production') {
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

app.post('/upload', upload.single('filu'), async (_req, res) => {
    const parseta = await parseUploadedFile(`./data/${user}.csv`, user);
    res.json( parseta );
});

app.get('/api/games', (_req, res) => {
    res.json( gameData.games.filter(g => g.match === true));
});
app.get('/api/hc', (_req, res) => {
    res.json( gameData.hc );
});


const PORT = process.env.PORT || 3001;
console.log('Portissa ' + PORT);
app.listen(PORT);

