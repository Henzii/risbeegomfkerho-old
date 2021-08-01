const express = require('express');
const cors = require('cors')
const app = express();
const parse = require('./testi');
const games = require('./games.json')
app.use(cors())

app.use( express.static('build'))

app.get('/api/games', async (req, res) => {
    res.json( games.games )
})
app.get('/api/courses', async( req, res) => {
    res.json( games.hc )
})


const PORT = process.env.PORT || 3001
console.log('Portissa' + PORT)
app.listen(PORT)

