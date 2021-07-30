
const fs = require('fs').promises;
const util = require('util')

const parse = async () => {
    const rawData = await fs.readFile('score.csv', 'utf-8')
    const data = rawData.split('\n').reverse();

    const courses = []
    const players = {
        Henkka: {},
        Antti: {},
        Teemu: {},
        Kimmo: {},
        Emma: {},
        Saku: {},
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
        if (date !== currentGame.course.date) {
            if (currentGame.players.length >= 2) {

                let courseStats = courses.find(c => (c.name === currentGame.course.name && c.layout === currentGame.course.layout))
                if (!courseStats) {
                    courseStats = { name: currentGame.course.name, layout: currentGame.course.layout, games: 0, players: [] }
                    courses.push(courseStats)
                }

                for (let playerObj of currentGame.players) {        // Laske Handicapit

                    let coursesPlayerObj = courseStats.players.find(p => p.name === playerObj.name)
                    if (!coursesPlayerObj) {
                        coursesPlayerObj = { name: playerObj.name, runningHC: 0, HC: 0, games: 0 }
                        courseStats.players.push(coursesPlayerObj)
                    }

                    playerObj['HC'] = coursesPlayerObj.HC || 0
                    playerObj['totalHC'] = Number(playerObj['total']) - playerObj.HC

                    coursesPlayerObj.runningHC += Number(playerObj.plusminus)
                    coursesPlayerObj.games++
                    coursesPlayerObj.HC = coursesPlayerObj.runningHC / coursesPlayerObj.games
                }
                if (currentGame.players.length >= 4) {
                    games.push(currentGame)
                    for (let playerObj of currentGame.players) {        // Laske rankingit
                        const rank = currentGame.players.reduce((p, c) => {
                            if (playerObj.total > c.total) p.total++
                            if (playerObj.totalHC > c.totalHC) p.hc++
                            return p;
                        }, { total: 1, hc: 1 })
                        playerObj['rank'] = rank.total
                        playerObj['rankHC'] = rank.hc
                    }
                }
         
            }
            currentGame = { course: { name: courseName, date, layout }, players: [] }
        }
        currentGame.players.push({ name, score, total: Number(total), plusminus: Number(plusminus) })

    }
    //console.log( util.inspect(courses, true, null, true) )
    console.log(util.inspect(games, true, null, true))
    return { games, courses }
}

module.exports = parse;