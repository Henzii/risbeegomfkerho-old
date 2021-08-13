
const fs = require('fs').promises;
const util = require('util')

const parse = async (fileName) => {
    const MIN_NUMBER_OF_PLAYERS_FOR_HC = 2;    // Min pelaajamäärä handicap laskuun
    const MIN_NUMBER_OF_PLAYERS_FOR_MATCH = 5;    // Min pelaajamäärä kisaan
    const PLAYERS = ["Henkka", "Antti", "Saikkis", "Teemu", "Sampo", "Emma", "Kimmo", "Jouni"]
    const ALLOW_YEAR = '2021'
    const HYLATYT_PELAAJAT = new Map()
    
    const palautus = {}

    let data = null
    try {
        data = require('./games.json')
        //console.log('games.json,', data.games.length, 'peliä.')
        palautus['alussa'] = data.games.length;
    } catch (e) {
        //console.log('games.json tiedostoa ei löydy.')
        data = { games: [], hc: [] }
        palautus['alussa'] = 0
    }
    let rawData
    const dataMap = new Map()

    try {
        rawData = await fs.readFile(fileName, 'utf-8')
    } catch (e) {
        console.log(e)
        return
    }
    // Haetaan olemassaolevien pelien "avaimet"
    for (const game of data.games) {
        dataMap.set(game.course.date + game.course.name, true)
    }
    let game = { players: [], course: {} }
    for (const line of rawData.split('\n')) {
        let [player, course, layout, date, total, plusminus, ...score] = line.split(',')
        if (player === "Saikkis") player = "Antti"

        if (!date || !date.startsWith(ALLOW_YEAR) || dataMap.get(date + course) === true) {
            continue;
        }

        if (player === 'Par') {
            if (game.players.length >= MIN_NUMBER_OF_PLAYERS_FOR_HC) {
                game['match'] = (game.players.length >= MIN_NUMBER_OF_PLAYERS_FOR_MATCH)
                data.games.push(game)
            }
            game = {
                course: {
                    name: course,
                    layout,
                    date,
                    par: total
                },
                players: []
            }
        } else if (PLAYERS.includes(player)) {
            game.players.push({ name: player, total: Number(total), plusminus: Number(plusminus), score })
        } else HYLATYT_PELAAJAT.set(player, HYLATYT_PELAAJAT.get(player) + 1 || 1)

    }
    // Järjestetään pelit
    data.games.sort((a, b) => new Date(a.course.date).getTime() - new Date(b.course.date).getTime())

    // Lasketaan Handicapit
    data.hc = []
    for (const game of data.games) {
        let courseHC = data.hc.find(c => c.course.name === game.course.name)

        if (!courseHC) {   // Jos rataa ei ole listalla, luodaan
            courseHC = { course: { name: game.course.name, layout: game.course.layout }, players: [] }
            data.hc.push(courseHC)
        }
        for (const player of game.players) {
            let playerHC = courseHC.players.find(p => p.name === player.name)
            if (!playerHC) {
                playerHC = { name: player.name, games: 0, hc: 0, runningHc: 0 }
                courseHC.players.push(playerHC)
            }
            player['HC'] = playerHC.hc
            player['totalHC'] = player.total - playerHC.hc

            playerHC.games++
            playerHC.runningHc += player.plusminus
            playerHC.hc = playerHC.runningHc / playerHC.games || 0
        }
        for (const player of game.players) {
            let rank = 1
            let rankHC = 1
            for (const otherPlayer of game.players) {
                if (otherPlayer.total < player.total) rank++
                if (otherPlayer.totalHC < player.totalHC) rankHC++
            }
            player['rank'] = rank
            player['rankHC'] = rankHC
        }

    }

    // Filteröidään ei-kilpailut pois
    data.games = data.games.filter(g => g.match === true)
    palautus['lopussa'] = data.games.length
    fs.writeFile('games.json', JSON.stringify(data), 'utf-8')
    palautus['hylatytPelaajat'] = [...HYLATYT_PELAAJAT];
    
    console.table(palautus);
    return palautus;
    
}

for (let i = 2; i < process.argv.length; i++)
    parse(process.argv[i])

