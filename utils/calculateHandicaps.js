"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHandicaps = void 0;
const calculateHandicaps = (pelit) => {
    if (pelit.length < 1)
        throw Error('Pelit on tyhjä perkele!');
    const hcTable = new Array();
    for (const peli of pelit) {
        let rataObj;
        //Etsi rata Handicap listalta tai luo uusi
        const rata = hcTable.find(c => c.course.name === peli.course.name && c.course.layout === peli.course.layout);
        if (!rata) {
            rataObj = { course: { name: peli.course.name, layout: peli.course.layout }, players: [] };
            hcTable.push(rataObj);
        }
        else
            rataObj = rata;
        for (const pelaaja of peli.players) {
            let pelaajaObj;
            //Etsi pelaaja radan listalta tai luo uusi
            const player = rataObj.players.find(p => p.name === pelaaja.name);
            if (!player) {
                pelaajaObj = { name: pelaaja.name, games: 0, hc: 0, runningHc: 0 };
                rataObj.players.push(pelaajaObj);
            }
            else
                pelaajaObj = player;
            // Lasken pelin Handicapit
            pelaaja.totalHC = pelaaja.total - pelaajaObj.hc;
            pelaaja.HC = pelaajaObj.hc;
            // Päivitä Handicapit
            pelaajaObj.games++;
            pelaajaObj.runningHc += pelaaja.plusminus;
            pelaajaObj.hc = pelaajaObj.runningHc / pelaajaObj.games;
        }
        // Lasketaan rankingit jokaiselle pelaajalle
        for (const pelaaja of peli.players) {
            const rankki = peli.players.reduce((p, c) => {
                if (c.total < pelaaja.total)
                    p.rank++;
                if (c.totalHC < pelaaja.totalHC)
                    p.rankHC++;
                return p;
            }, { rank: 1, rankHC: 1 });
            pelaaja.rank = rankki.rank;
            pelaaja.rankHC = rankki.rankHC;
        }
    }
    return hcTable;
};
exports.calculateHandicaps = calculateHandicaps;
