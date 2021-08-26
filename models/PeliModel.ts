
import mongoose from 'mongoose';

const skeema = new mongoose.Schema({
    _id: String,
    fromUser: String,
    date: Date,
    match: Boolean,
    rata: String,
    HC: Number,
    players: [
        {
            name: String,
            total: Number,
            plusminus: Number,
            totalHC: {
                type: Number,
                default: 0
            },
            HC: {
                type: Number,
                default: 0
            },
            rank: {
                type: Number,
                default: 0
            },
            rankHC: {
                type: Number,
                default: 0
            },
            score: [String],
            _id: false
        }
    ],
    course: {
        name: String,
        layout: String,
        par: Number,
    }    
});
export default mongoose.model('peli', skeema);

