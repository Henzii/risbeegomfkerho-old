
const fs = require('fs').promises;
const util = require('util')

const parse = async () => {
    const rawData = await fs.readFile('score.csv', 'utf-8')
    const data = rawData.split('\n').reverse();
    let allRounds = []
    let roundData = { course: null, players: [] }
    const pointsArray = [
        10, 6, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0
    ]
    const playerStats = {
        Henkka: { sijoitukset: [], runningHC: 0, games: 0 },
        Saikkis: { sijoitukset: [], runningHC: 0, games: 0 },
        Jouni: { sijoitukset: [], runningHC: 0, games: 0 },
        Kimmo: { sijoitukset: [], runningHC: 0, games: 0 },
        Emma: { sijoitukset: [], runningHC: 0, games: 0 },
        Teemu: { sijoitukset: [], runningHC: 0, games: 0 },
        Sampo: { sijoitukset: [], runningHC: 0, games: 0 },
        Henu: { sijoitukset: [], runningHC: 0, games: 0 },
        Kari: { sijoitukset: [], runningHC: 0, games: 0 },

    }

    let gameIndex = 0;

    for (const line in data) {
        let [name, courseName, layout, date, total, plusminus, ...score] = data[line].split(',');

        if (name === 'Antti') name = 'Saikkis'

        const course = {
            courseName,
            layout,
            date,
        }
        if (roundData.course?.date !== course.date) {
            if (roundData.players?.length >= 5 && course.date?.startsWith('2021')) {    // Kierros valmis: sortataan, lasketaan rank ja push
                for (const p of roundData.players) {
                    // Lasketaan kaikille handicapit
                    p['HC'] = playerStats[p.name].runningHC / playerStats[p.name].games || 0
                    playerStats[p.name].games++;
                    playerStats[p.name]['handiCap'] = p['HC']
                    p['totalHC'] = p.total - p['HC']

                    playerStats[p.name].runningHC += Number(p.plusminus)
                }
                roundData.players.sort((a,b) => a.totalHC - b.totalHC)
                let rank = 1;

                for(const i in roundData.players) {
                    // Lasketaan rnkingit
                    const p = roundData.players[i]
                    let prevTulos = roundData.players[i - 1]?.totalHC || -1
                    if (p.totalHC !== prevTulos) rank = Number(i) + 1
                    playerStats[p.name].sijoitukset[gameIndex] = rank
                    p['rank'] = rank
                }
                allRounds.push(roundData)
                gameIndex++;
            }

            roundData = { course, players: [] }
        }
        if (name in playerStats) {
            roundData.players.push({ name, total, plusminus, score })
        } else if (name === 'Par') {
            course.par = total
            course.parHoles = score
        }
    }
    return allRounds;
}

module.exports = parse;