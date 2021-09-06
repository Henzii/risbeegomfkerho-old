"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HandicapListModel_1 = __importDefault(require("../models/HandicapListModel"));
const PeliModel_1 = __importDefault(require("../models/PeliModel"));
const gameApiRouter = express_1.default.Router();
gameApiRouter.get('/hc', (_req, res) => {
    HandicapListModel_1.default.find({})
        .then(data => {
        res.json(data);
    }).catch(e => {
        console.log(e);
        res.status(400).end();
    });
});
gameApiRouter.get('/games', (_req, res) => {
    PeliModel_1.default.find({ match: true }).sort({ date: 1 }).then(data => {
        res.json(data);
    }).catch(e => {
        console.log('Error!', e);
        res.status(400).end();
    });
});
exports.default = gameApiRouter;
