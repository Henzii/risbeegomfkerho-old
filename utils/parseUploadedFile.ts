import fs from 'fs/promises';
import { Peli } from '../types';
import setup from './parser.config..json';

export const parseUploadedFile = async (filename: string, fromUser = '') => {

    const fileData = await fs.readFile(filename, 'utf-8') as unknown as string;
    const rivit = fileData.split('\n');

    const ignored = {
        wrongDate: 0,
        wrongName: {
            count: 0,
            names: new Array<string>()
        },
    };
    let peli: Peli = { _id: '', date: new Date(), course: { name: '', layout: '', par: 0 }, players: [], match: false };
    const pelit: Array<Peli> = [];

    for (const rivi of rivit) {
        // eslint-disable-next-line prefer-const
        let [player, course, layout, date, total, plusminus, ...score] = rivi.split(',');
        if (player === 'Saikkis') player = "Antti";
        if (player === "Ilkka" || player === "Ilkka Davidsen") player = "Ile";
        if (course === "Malminiitty" && layout === "Vakio layout") layout = "Niitty";
        if (player === 'Par' || rivi === '') {
            if (peli.players.length >= setup.minPlayersForHc) {
                peli.match = peli.players.length >= setup.minPlayersForMatch;
                if (fromUser !== '') peli['fromUser'] = fromUser;
                pelit.push(peli);
            }
            peli = {
                _id: (course?.toLowerCase() + "-" + layout?.toLowerCase() + "-" + date).replace(/[:,. ()öäå]/g, '-'),
                date: new Date(date),
                course: {
                    name: '',
                    layout: '',
                    par: 0
                },
                players: []
            };
            peli.course = { name: course, layout, par: +total };
        } else if (new Date(date).getTime() < new Date(setup.scoresAfterDate).getTime()) {
            ignored.wrongDate++;
        } else if (!setup.allowedPlayers.includes(player)) {
            ignored.wrongName.count++;
            if (!ignored.wrongName.names.includes(player))
                ignored.wrongName.names.push(player);
        }
        else {
            peli.players.push({ name: player, total: +total, plusminus: +plusminus, score });
        }

    }
    return { pelit, ignored };

};
