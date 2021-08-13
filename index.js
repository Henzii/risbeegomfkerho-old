const express = require('express');
const cors = require('cors')
const app = express();
const games = require('./games.json');
const { parse } = require('./addFile');
app.use(cors())

app.use( express.static('build'))

app.get('/api/games', async (req, res) => {
    res.json( games.games.filter(g => g.match === true) )
})
app.get('/api/courses', async( req, res) => {
    res.json( games.hc )
})
app.get('/remake', async ( req, res) => {
    
    res.json(await parse('UdiscHenkka.csv'))
    
    
})

const PORT = process.env.PORT || 3001
console.log('Portissa' + PORT)
app.listen(PORT)

