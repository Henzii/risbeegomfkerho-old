const express = require('express');
const cors = require('cors')
const app = express();
const parse = require('./testi');

app.use(cors())

app.use( express.static('build'))

app.get('/api/games', async (req, res) => {
    const { games } = await parse()
    res.json( games )
})
app.get('/api/courses', async( req, res) => {
    const { courses } = await parse()
    res.json( courses )
})


const PORT = process.env.PORT || 3001
console.log('Portissa' + PORT)
app.listen(PORT)

