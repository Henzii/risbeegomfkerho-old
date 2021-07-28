const express = require('express');
const cors = require('cors')
const app = express();
const parse = require('./testi');

app.use(cors())

app.use( express.static('build'))

app.get('/api/', async (req, res) => {
    res.json( await parse() )
})


const PORT = process.env.PORT || 3000
console.log('Portissa' + PORT)
app.listen(PORT)

