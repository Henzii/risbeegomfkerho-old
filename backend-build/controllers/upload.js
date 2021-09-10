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
//import HandicapListModel from '../models/HandicapListModel';
const parseUploadedFile_1 = require("../utils/parseUploadedFile");
const createHcTable_1 = require("../utils/createHcTable");
const PeliModel_1 = __importDefault(require("../models/PeliModel"));
const multer_1 = __importDefault(require("multer"));
const uploadRouter = express_1.default.Router();
const user = 'Ussr';
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, './data'),
    filename: (_req, _file_, cb) => cb(null, `${user}.csv`)
});
const upload = multer_1.default({ storage: storage });
uploadRouter.post('/', upload.single('filu'), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        createHcTable_1.createHcTable().catch((e) => console.log('Failed! ', e));
        res.send(Object.assign(Object.assign({}, ignored), lisatty));
    });
}));
exports.default = uploadRouter;
