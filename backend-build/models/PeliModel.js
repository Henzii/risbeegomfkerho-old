"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skeema = new mongoose_1.default.Schema({
    _id: String,
    fromUser: String,
    date: Date,
    match: Boolean,
    rata: String,
    HC: Number,
    players: [
        {
            name: String,
            total: Number,
            plusminus: Number,
            totalHC: {
                type: Number,
                default: 0
            },
            HC: {
                type: Number,
                default: 0
            },
            rank: {
                type: Number,
                default: 0
            },
            rankHC: {
                type: Number,
                default: 0
            },
            score: [String],
            _id: false
        }
    ],
    course: {
        name: String,
        layout: String,
        par: Number,
        pars: [String],
    }
});
exports.default = mongoose_1.default.model('peli', skeema);
