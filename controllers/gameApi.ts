
import express from 'express';
import HandicapListModel from '../models/HandicapListModel';
import PeliModel from '../models/PeliModel';
const gameApiRouter = express.Router();

gameApiRouter.get('/hc', (_req, res) => {
    HandicapListModel.find({})
        .then(data => {
            res.json(data);
        }).catch(e => {
            console.log(e);
            res.status(400).end();
        });

});
gameApiRouter.get('/games', (_req, res) => {
    PeliModel.find({ match: true }).sort({ date: 1 }).then(data => {
        res.json(data);
    }).catch(e => {
        console.log('Error!', e);
        res.status(400).end();
    });
});

export default gameApiRouter;