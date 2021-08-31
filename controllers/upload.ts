import express from 'express';
//import HandicapListModel from '../models/HandicapListModel';
import { parseUploadedFile } from '../utils/parseUploadedFile';
import { createHcTable } from '../utils/createHcTable';
import PeliModel from '../models/PeliModel';
import multer from 'multer';

const uploadRouter = express.Router();

const user = 'Ussr';

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, './data'),
    filename: (_req, _file_, cb) => cb(null, `${user}.csv`)
});
const upload = multer({ storage: storage });

uploadRouter.post('/', upload.single('filu'), async (_req, res) => {
    const { pelit, ignored } = await parseUploadedFile(`./data/${user}.csv`, user);
    const lisatty = { uusia: 0, duplikaatteja: 0 };
    console.log('Received file from ' + user);
    console.log('Inserting to db...');
    PeliModel.insertMany(pelit, { ordered: false }).then((res) => {
        console.log('Ok, lisätty kaikki', res.length);
        lisatty.uusia = res.length;
    }).catch(e => {
        console.log('Virhe! Lisätty:', e.result.result.nInserted, ", duplikaatteja:", e.result.result.writeErrors.length);
        lisatty.uusia = e.result.result.nInserted as number;
        lisatty.duplikaatteja = e.result.result.writeErrors.length as number;
    }).finally(() => {
        createHcTable().catch((e) => console.log('Failed! ', e));
        res.send({ ...ignored, ...lisatty });
    });
});
export default uploadRouter;