import HandicapListModel from '../models/HandicapListModel';
import PeliModel from '../models/PeliModel';
import { Peli } from '../types';
import { calculateHandicaps } from './calculateHandicaps';

export const createHcTable = async (): Promise<boolean> => {
    
    const pelit = await PeliModel.find({}).sort({ date: 1 }) as unknown as Array<Peli>;
    const { hcTable, matches } = calculateHandicaps(pelit);
    console.log('Kirjoitetaan hctaulukkoa...');
    try {
        await HandicapListModel.deleteMany({});
        await HandicapListModel.insertMany(hcTable);
        console.log('OK!\n\nPäivitetään kilpailuja...');
        try {
            // Poistetaan kaikilta kilpailu-merkintä
            await PeliModel.updateMany(
                {},
                { $set: { match: false }}
            );

            // Kirjoitetaan uusille kilpailuille match: true
            const bulkki = matches.map(m => (
                {
                    replaceOne: {
                        upsert: true,
                        filter: {
                            _id: m._id
                        },
                        replacement: m
                    }
                }
            ));
            await PeliModel.bulkWrite(bulkki);
            //  ------------------------------------------
            console.log('OK!');
        } catch (e) {
            console.log('Error!', e);
        }

    } catch (e) {
        console.log('Error!', e);
    }
    return true;
};
