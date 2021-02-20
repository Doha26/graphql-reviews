const express = require('express');
const cors = require('cors');

const reviews = require('./db/reviews.json')
const items = require('./db/items.json')

const app = express();
app.use(cors())

/*
  In this file, i just setup a basic NODE REST
  API that expose two endpoints /reviews && /items.
 */
app.get('/reviews', (req, res) => {
    return res.status(200).json(reviews)
})

app.get('/items', (req, res) => {
    return res.status(200).json(items)
})

app.listen(3000, () => {
    console.log(`Server started on port ${3000}`);
})
