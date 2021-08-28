"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const parseUploadedFile_1 = require("./utils/parseUploadedFile");
const mongoose_1 = __importDefault(require("mongoose"));
const PeliModel_1 = __importDefault(require("./models/PeliModel"));
const HandicapListModel_1 = __importDefault(require("./models/HandicapListModel"));
const calculateHandicaps_1 = require("./utils/calculateHandicaps");
const app = express_1.default();
let user = 'Unknown';
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, './data'),
    filename: (_req, _file_, cb) => cb(null, `${user}.csv`)
});
const upload = multer_1.default({ storage: storage });
dotenv_1.default.config();
app.use(cors_1.default());
app.use(express_1.default.json());
// Heroku force https
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`);
        else
            next();
    });
}
app.use(express_1.default.static('build'));
app.post('/login', (req, res) => {
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
//////////////////////////////////////////////////////////////
// !! Tästä eteenpäin 401:stä jos ei ole validia tokenia !! //
//////////////////////////////////////////////////////////////
app.use((req, res, next) => {
    var _a;
    const auth = (_a = req.get('authorization')) === null || _a === void 0 ? void 0 : _a.slice(7);
    try {
        user = jsonwebtoken_1.default.verify(auth, process.env.TOKEN_KEY);
        console.log(`${req.secure} ${req.method} ${req.path} ${user}`);
        next();
    }
    catch (e) {
        console.log(`${req.secure} ${req.method} ${req.path} Epäkelpo token, estetty!`);
        res.status(401).end();
    }
});
app.get('/api/calculateHandicaps', (_req, res) => {
    console.log('Haetaan pelejä...');
    PeliModel_1.default.find({}).sort({ date: 1 }).then(pelit => {
        const hoocee = calculateHandicaps_1.calculateHandicaps(pelit);
        res.json(hoocee);
        console.log('Tuhotaan hc-listaa tietokannasta...');
        HandicapListModel_1.default.deleteMany({}).then(() => {
            console.log('OK!\nLisätään uutta hc-taulua tietokantaan...');
            HandicapListModel_1.default.insertMany(hoocee.hcTable)
                .then(() => console.log('OK!'))
                .catch(e => console.log('Virhe!', e));
        }).catch(e => console.log('Virhe!', e));
    }).catch(e => {
        res.status(401).send(e);
    });
});
app.get('/api/games', (_req, res) => {
    PeliModel_1.default.find({}).sort({ date: 1 }).then(pelit => {
        const { matches } = calculateHandicaps_1.calculateHandicaps(pelit);
        res.json(matches);
    }).catch(e => {
        res.status(400).send(e);
    });
});
app.get('/api/hc', (_req, res) => {
    PeliModel_1.default.find({}).sort({ date: 1 }).then(pelit => {
        const { hcTable } = calculateHandicaps_1.calculateHandicaps(pelit);
        res.json(hcTable);
    }).catch(e => {
        res.status(400).send(e);
    });
});
app.post('/upload', upload.single('filu'), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pelit, ignored } = yield parseUploadedFile_1.parseUploadedFile(`./data/${user}.csv`, user);
    const lisatty = { uusia: 0, duplikaatteja: 0 };
    console.log('Received file from ' + user);
    console.log('Inserting to db...');
    PeliModel_1.default.insertMany(pelit, { ordered: false }).then((res) => {
        console.log('Ok, lisätty kaikki', res.length);
        lisatty.uusia = res.length;
    }).catch(e => {
        console.log('Virhe! Lisätty:', e.result.result.nInserted, ", duplikaatteja:", e.result.result.writeErrors.length);
        lisatty.uusia = e.result.result.nInserted;
        lisatty.duplikaatteja = e.result.result.writeErrors.length;
    }).finally(() => {
        res.send(Object.assign(Object.assign({}, ignored), lisatty));
    });
}));
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    console.log('yhdistetty tietokantaan');
}).catch(e => {
    console.log('Virhe yhdistettäessä tietokantaan! ', e.message);
});
const PORT = process.env.PORT || 3001;
console.log('Portissa ' + PORT);
app.listen(PORT);
