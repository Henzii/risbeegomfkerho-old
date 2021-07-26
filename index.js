const express = require('express');

const app = express();
const parse = require('./testi');

app.get('/api/', async (req, res) => {
    res.json( await parse() )
})
const PORT = process.env.PORT || 3000
console.log('Portissa' + PORT)
app.listen(PORT)

