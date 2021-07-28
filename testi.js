
const fs = require('fs').promises;
const util = require('util')

const parse = async () => {
    const rawData = await fs.readFile('score.csv', 'utf-8')
    const data = rawData.split('\n').reverse();

    const courses = {
        Malminiitty: { layout: 'Niitty', games: 0, players: {} },
        Siltamäki: { layout: 'Updated', games: 0, players: {} },
        'Lentolan Frisbeegolf': { games: 0, players: {} },
        'Separi Simppari': { games: 0, players: {} },
        'Separisimppa': { games: 0, players: {} },
        'Ford DiscGolfPark': { layout: 'Blue layout', games: 0, players: {} }
    }
    const players = {
        Henkka: {},
        Antti: {},
        Teemu: {},
        Kimmo: {},
        Emma: {},
        Jouni: {},
        Sampo: {},
        Henu: {}
    }
    const games = []

    let currentGame = { course: { name: '', date: '' }, players: [] }

    for (let i = 0; i < data.length; i++) {
        let [name, courseName, layout, date, total, plusminus, ...score] = data[i].split(',');
        if (name === 'Saikkis') name = 'Antti'
        if (!(name in players) || !date.startsWith('2021')) {
            continue;
        }
        if (!(courseName in courses) && (courses[courseName]?.layout === undefined || courses[courseName].layout === layout)) {
            continue;
        }
        if (date !== currentGame.course.date) {
            if (currentGame.players.length >= 4) {
                games.push(currentGame)
                for (let playerObj of currentGame.players) {
                    console.log(playerObj.name + " @ " + currentGame.course.name + " = " + playerObj.plusminus)
                    if (!(playerObj.name in courses[currentGame.course.name].players)) {
                        courses[currentGame.course.name].players[playerObj.name] = { runningHC: 0, HC: 0, games: 0 }
                    }
                    const coursesPlayerObj = courses[currentGame.course.name].players[playerObj.name]

                    playerObj['HC'] = coursesPlayerObj.HC || 0
                    playerObj['totalHC'] = Number(playerObj['total']) - playerObj.HC
                    
                    coursesPlayerObj.runningHC += Number(playerObj.plusminus)
                    coursesPlayerObj.games++
                    coursesPlayerObj.HC = coursesPlayerObj.runningHC / coursesPlayerObj.games
                }
            }
            currentGame = { course: { name: courseName, date, layout }, players: [] }
        }
        currentGame.players.push({ name, score, total, plusminus })

    }
    //console.log( util.inspect(courses, true, null, true) )
    console.log( util.inspect(games, true, null, true))
    return games
}

module.exports = parse;