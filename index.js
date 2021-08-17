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
const games_json_1 = __importDefault(require("./data/games.json"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const parseUploadedFile_1 = require("./utils/parseUploadedFile");
const app = express_1.default();
let user = 'Unknown';
let gameData;
if ('games' in games_json_1.default && 'hc' in games_json_1.default)
    gameData = games_json_1.default;
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, './data'),
    filename: (_req, _file_, cb) => cb(null, `${user}.csv`)
});
const upload = multer_1.default({ storage: storage });
dotenv_1.default.config();
app.use(cors_1.default());
app.use(express_1.default.static('build'));
app.use(express_1.default.json());
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (password === process.env.SEC_PASSWORD) {
        const token = jsonwebtoken_1.default.sign(username, process.env.TOKEN_KEY);
        console.log(`${username} logged in`);
        res.json(token);
    }
    else {
        res.status(401).end();
    }
});
app.use((req, res, next) => {
    var _a;
    const auth = (_a = req.get('authorization')) === null || _a === void 0 ? void 0 : _a.slice(7);
    try {
        user = jsonwebtoken_1.default.verify(auth, process.env.TOKEN_KEY);
        console.log(`${req.method} ${req.path} ${user}`);
        next();
    }
    catch (e) {
        console.log(`${req.method} ${req.path} Estetty! (${user})`);
        res.status(401).end();
    }
});
app.post('/upload', upload.single('filu'), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseta = yield parseUploadedFile_1.parseUploadedFile(`./data/${user}.csv`);
    res.json(parseta);
}));
app.get('/api/games', (_req, res) => {
    res.json(gameData.games.filter(g => g.match === true));
});
app.get('/api/hc', (_req, res) => {
    res.json(gameData.hc);
});
const PORT = process.env.PORT || 3001;
console.log('Portissa' + PORT);
app.listen(PORT);
