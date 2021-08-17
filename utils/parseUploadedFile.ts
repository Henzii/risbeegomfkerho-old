import fs from 'fs/promises';

import { hcTable, JSONdata, Peli } from '../types';
import { removeDuplicates } from './removeDuplicates';

import rawData from '../data/games.json';
import { calculateHandicaps } from './calculateHandicaps';

const SCORES_AFTER = '2021';
const MIN_PLAYER_COUNT = 2;
const MIN_PLAYER_COUNT_MATCH = 5;
const ALLOWED_PLAYERS = ["Henkka", "Antti", "Saikkis", "Teemu", "Sampo", "Emma", "Kimmo", "Jouni"];

export const parseUploadedFile = async (filename: string, fromUser = '') => {

    let gameData: JSONdata;

    if (!('games' in rawData)) gameData = { games: new Array<Peli>(), hc: new Array<hcTable>() };
    else gameData = rawData as JSONdata;

    const fileData = await fs.readFile(filename, 'utf-8') as unknown as string;
    const rivit = fileData.split('\n');

    let pelit: Array<Peli> = [];
    const palautus = {
        newResults: 0,
        ignored: {
            wrongDate: 0,
            wrongName: {
                count: 0,
                names: new Array<string>()
            },
            duplicates: 0,
        }
    };
    let peli: Peli = { course: { name: '', layout: '', date: '', par: '' }, players: [], match: false };

    for (const rivi of rivit) {
        // eslint-disable-next-line prefer-const
        let [player, course, layout, date, total, plusminus, ...score] = rivi.split(',');

        if (player === 'Saikkis') player = 'Antti';
        if (player === '' || date === '') continue;

        if (player === 'Par') {
            if (peli.players.length >= MIN_PLAYER_COUNT) {
                peli.match = peli.players.length >= MIN_PLAYER_COUNT_MATCH;
                if (fromUser !== '') peli['fromUser'] = fromUser;
                pelit.push(peli);
            }
            peli = { course: { name: '', layout: '', date: '', par: '' }, players: [], match: false };
            peli.course = { name: course, layout, date, par: total };
        } else if (!date.startsWith(SCORES_AFTER)) {
            palautus.ignored.wrongDate++;
        } else if (!ALLOWED_PLAYERS.includes(player)) {
            palautus.ignored.wrongName.count++;
            if (!palautus.ignored.wrongName.names.includes(player))
                palautus.ignored.wrongName.names.push(player);
        }
        else {
            peli.players.push({ name: player, total: +total, plusminus: +plusminus, score, totalHC: 0, HC: 0 });
        }

    }

    palautus.ignored.duplicates = pelit.length;
    pelit = removeDuplicates(pelit, gameData.games);
    palautus.ignored.duplicates -= pelit.length;

    palautus.newResults = pelit.length;

    if (pelit.length > -1) {
        gameData.games = gameData.games.concat(pelit);
        gameData.games.sort((a, b) => {
            //if (!a.course || !b.course) return 0;
            return new Date(a.course.date).getTime() - new Date(b.course.date).getTime();
        });
        gameData.hc = calculateHandicaps(gameData.games);

        await fs.writeFile('./data/games.json', JSON.stringify(gameData), 'utf-8');
    }
    return { ...palautus };
};