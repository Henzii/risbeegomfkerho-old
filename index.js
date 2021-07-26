const express = require('express');

const app = express();
const parse = require('./testi');

app.get('/api/', async (req, res) => {
    res.json( await parse() )
})

app.listen(3000);