import { Peli, hcTable, PlayerHC } from "../types";

import setup from './parser.config..json';

export const calculateHandicaps = (pelit: Array<Peli>) => {

    if (pelit.length < 1) throw Error('Pelit on tyhjä perkele!');

    const hcTable = new Array<hcTable>();
    const matches = new Array<Peli>();
    for (const peli of pelit) {
        let rataObj: hcTable;

        //Etsi rata Handicap listalta tai luo uusi
        const rata = hcTable.find(c => c.course.name === peli.course.name && c.course.layout === peli.course.layout);
        if (!rata) {
            rataObj = { course: { name: peli.course.name, layout: peli.course.layout }, players: [] };
            hcTable.push(rataObj);
        } else rataObj = rata;

        for (const pelaaja of peli.players) {
            let pelaajaObj: PlayerHC;

            //Etsi pelaaja radan listalta tai luo uusi
            const player = rataObj.players.find(p => p.name === pelaaja.name);
            if (!player) {
                pelaajaObj = { name: pelaaja.name, games: 0, hc: 0, lastRounds: [], median: 0, average: 0 };
                rataObj.players.push(pelaajaObj);
            } else pelaajaObj = player;

            //Lasken pelin Handicapit
            pelaaja.totalHC = pelaaja.total - pelaajaObj.hc;
            pelaaja.HC = pelaajaObj.hc;

            // Päivitä Handicapit
            pelaajaObj.games++;
            pelaajaObj.lastRounds.unshift(pelaaja.plusminus);
            
            //if (pelaajaObj.lastRounds.length > setup.lastRoundsCount) pelaajaObj.lastRounds.shift();
            pelaajaObj.median = median(pelaajaObj.lastRounds);
            pelaajaObj.average = pelaajaObj.lastRounds.reduce((p, c) => p + c, 0) / pelaajaObj.lastRounds.length;
            pelaajaObj.hc = pelaajaObj.median;
        }
        if (peli.players.length >= setup.minPlayersForMatch && peli.date.getTime() >= new Date(setup.matchesAfterDate).getTime()) {
            peli.match = true;
            // Lasketaan rankingit jokaiselle pelaajalle
            for (const pelaaja of peli.players) {
                const rankki = peli.players.reduce((p, c) => {
                    if (c.total < pelaaja.total) p.rank++;
                    if (c.totalHC && pelaaja.totalHC && c.totalHC < pelaaja.totalHC) p.rankHC++;
                    return p;
                }, { rank: 1, rankHC: 1 });
                pelaaja.rank = rankki.rank;
                pelaaja.rankHC = rankki.rankHC;
            }
            matches.push(peli);
        }
    }
    return { hcTable, matches };
};
const median = (data: Array<number>): number => {
    const arvot = data.slice(0,setup.lastRoundsCount);
    arvot.sort((a, b) => a - b);
    const pituus = arvot.length;
    if (pituus === 0) return 0;
    if (pituus % 2 === 0) return ((arvot[pituus / 2 - 1] + arvot[pituus / 2]) / 2);
    else return arvot[Math.floor(pituus / 2)];
};