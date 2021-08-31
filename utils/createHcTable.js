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
exports.createHcTable = void 0;
const HandicapListModel_1 = __importDefault(require("../models/HandicapListModel"));
const PeliModel_1 = __importDefault(require("../models/PeliModel"));
const calculateHandicaps_1 = require("./calculateHandicaps");
const createHcTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const pelit = yield PeliModel_1.default.find({}).sort({ date: 1 });
    const { hcTable, matches } = calculateHandicaps_1.calculateHandicaps(pelit);
    console.log('Kirjoitetaan hctaulukkoa...');
    try {
        yield HandicapListModel_1.default.deleteMany({});
        yield HandicapListModel_1.default.insertMany(hcTable);
        console.log('OK!\n\nPäivitetään kilpailuja...');
        try {
            // Poistetaan kaikilta kilpailu-merkintä
            yield PeliModel_1.default.updateMany({}, { $set: { match: false } });
            // Kirjoitetaan uusille kilpailuille match: true
            const bulkki = matches.map(m => ({
                replaceOne: {
                    upsert: true,
                    filter: {
                        _id: m._id
                    },
                    replacement: m
                }
            }));
            yield PeliModel_1.default.bulkWrite(bulkki);
            //  ------------------------------------------
            console.log('OK!');
        }
        catch (e) {
            console.log('Error!', e);
        }
    }
    catch (e) {
        console.log('Error!', e);
    }
    return true;
});
exports.createHcTable = createHcTable;
