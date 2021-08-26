import mongoose from 'mongoose';

const skeema = new mongoose.Schema({
    course: {
        name: String,
        layout: String,
    },
    players: [
        {
            name: String,
            games: Number,
            hc: Number,
            median: Number,
            average: Number,
            lastRounds: [Number],
            _id: false
        }
    ]
});

export default mongoose.model('hctable', skeema);