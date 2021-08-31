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
exports.parseUploadedFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const parser_config__json_1 = __importDefault(require("./parser.config..json"));
const parseUploadedFile = (filename, fromUser = '') => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = yield promises_1.default.readFile(filename, 'utf-8');
    const rivit = fileData.split('\n');
    const ignored = {
        wrongDate: 0,
        wrongName: {
            count: 0,
            names: new Array()
        },
    };
    let peli = { _id: '', date: new Date(), course: { name: '', layout: '', par: 0 }, players: [], match: false };
    const pelit = [];
    for (const rivi of rivit) {
        // eslint-disable-next-line prefer-const
        let [player, course, layout, date, total, plusminus, ...score] = rivi.split(',');
        if (player === 'Saikkis')
            player = "Antti";
        if (player === "Ilkka" || player === "Ilkka Davidsen")
            player = "Ile";
        if (course === "Malminiitty" && layout === "Vakio layout")
            layout = "Niitty";
        if (player === 'Par' || rivi === '') {
            if (peli.players.length >= parser_config__json_1.default.minPlayersForHc) {
                peli.match = peli.players.length >= parser_config__json_1.default.minPlayersForMatch;
                if (fromUser !== '')
                    peli['fromUser'] = fromUser;
                pelit.push(peli);
            }
            peli = {
                _id: ((course === null || course === void 0 ? void 0 : course.toLowerCase()) + "-" + (layout === null || layout === void 0 ? void 0 : layout.toLowerCase()) + "-" + date).replace(/[:,. ()öäå]/g, '-'),
                date: new Date(date),
                course: {
                    name: '',
                    layout: '',
                    par: 0
                },
                players: []
            };
            peli.course = { name: course, layout, par: +total };
        }
        else if (new Date(date).getTime() < new Date(parser_config__json_1.default.scoresAfterDate).getTime()) {
            ignored.wrongDate++;
        }
        else if (!parser_config__json_1.default.allowedPlayers.includes(player)) {
            ignored.wrongName.count++;
            if (!ignored.wrongName.names.includes(player))
                ignored.wrongName.names.push(player);
        }
        else {
            peli.players.push({ name: player, total: +total, plusminus: +plusminus, score });
        }
    }
    return { pelit, ignored };
});
exports.parseUploadedFile = parseUploadedFile;
