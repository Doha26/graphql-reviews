import express from 'express';
import cors from 'cors';
import * as reviews from './db/reviews.json'
import * as items from './db/items.json'

const port = process.env.PORT || 3000;
const app = express();
app.use(cors())

/*
  In this file, i just setup a basic NODE REST
  API that expose two endpoints /reviews && /items.
 */

app.get('/reviews', (req: express.Request, res: express.Response) => {
    return res.status(200).json(reviews)
})

app.get('/items', (req: express.Request, res: express.Response) => {
    return res.status(200).json(items)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})