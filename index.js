"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const gameApi_1 = __importDefault(require("./controllers/gameApi"));
const upload_1 = __importDefault(require("./controllers/upload"));
const login_1 = __importDefault(require("./controllers/login"));
const middleware_1 = require("./utils/middleware");
const app = express_1.default();
dotenv_1.default.config();
app.use(cors_1.default());
app.use(express_1.default.json());
// Heroku force https
app.use(middleware_1.forceHTTPS);
app.use(middleware_1.puhuja);
app.use(express_1.default.static('build'));
app.use('/login', login_1.default);
app.use('/api', middleware_1.requireLogin(), gameApi_1.default);
app.use('/upload', middleware_1.requireLogin(), upload_1.default);
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    console.log('yhdistetty tietokantaan');
}).catch(e => {
    console.log('Virhe yhdistettäessä tietokantaan! ', e.message);
});
const PORT = process.env.PORT || 3001;
console.log('Portissa ' + PORT);
app.listen(PORT);
