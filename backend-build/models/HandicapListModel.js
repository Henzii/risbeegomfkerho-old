"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skeema = new mongoose_1.default.Schema({
    course: {
        name: String,
        layout: String,
    },
    players: [
        {
            name: String,
            games: Number,
            hc: Number,
            median: Number,
            average: Number,
            lastRounds: [Number],
            _id: false
        }
    ]
});
exports.default = mongoose_1.default.model('hctable', skeema);
