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
const removeDuplicates_1 = require("./removeDuplicates");
const games_json_1 = __importDefault(require("../data/games.json"));
const calculateHandicaps_1 = require("./calculateHandicaps");
const parser_config__json_1 = __importDefault(require("./parser.config..json"));
const SCORES_AFTER = '2021';
const parseUploadedFile = (filename, fromUser = '') => __awaiter(void 0, void 0, void 0, function* () {
    let gameData;
    if (!('games' in games_json_1.default))
        gameData = { games: new Array(), hc: new Array() };
    else
        gameData = games_json_1.default;
    const fileData = yield promises_1.default.readFile(filename, 'utf-8');
    const rivit = fileData.split('\n');
    let pelit = [];
    const palautus = {
        newResults: 0,
        ignored: {
            wrongDate: 0,
            wrongName: {
                count: 0,
                names: new Array()
            },
            duplicates: 0,
        }
    };
    let peli = { course: { name: '', layout: '', date: '', par: '' }, players: [], match: false };
    for (const rivi of rivit) {
        // eslint-disable-next-line prefer-const
        let [player, course, layout, date, total, plusminus, ...score] = rivi.split(',');
        if (player === 'Saikkis')
            player = "Antti";
        if (player === "Ilkka" || player === "Ilkka Davidsen")
            player = "Ile";
        if (player === '' || date === '')
            continue;
        if (player === 'Par') {
            if (peli.players.length >= parser_config__json_1.default.minPlayersForHc) {
                peli.match = peli.players.length >= parser_config__json_1.default.minPlayersForMatch;
                if (fromUser !== '')
                    peli['fromUser'] = fromUser;
                pelit.push(peli);
            }
            peli = { course: { name: '', layout: '', date: '', par: '' }, players: [], match: false };
            peli.course = { name: course, layout, date, par: total };
        }
        else if (!date.startsWith(SCORES_AFTER)) {
            palautus.ignored.wrongDate++;
        }
        else if (!parser_config__json_1.default.allowedPlayers.includes(player)) {
            palautus.ignored.wrongName.count++;
            if (!palautus.ignored.wrongName.names.includes(player))
                palautus.ignored.wrongName.names.push(player);
        }
        else {
            peli.players.push({ name: player, total: +total, plusminus: +plusminus, score, totalHC: 0, HC: 0 });
        }
    }
    palautus.ignored.duplicates = pelit.length;
    pelit = removeDuplicates_1.removeDuplicates(pelit, gameData.games);
    palautus.ignored.duplicates -= pelit.length;
    palautus.newResults = pelit.length;
    if (pelit.length > -1) {
        gameData.games = gameData.games.concat(pelit);
        gameData.games.sort((a, b) => {
            //if (!a.course || !b.course) return 0;
            return new Date(a.course.date).getTime() - new Date(b.course.date).getTime();
        });
        gameData.hc = calculateHandicaps_1.calculateHandicaps(gameData.games);
        yield promises_1.default.writeFile('./data/games.json', JSON.stringify(gameData), 'utf-8');
    }
    return Object.assign({}, palautus);
});
exports.parseUploadedFile = parseUploadedFile;
