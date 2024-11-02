// models/Interested.js
import mongoose from 'mongoose';

const interestedSchema = new mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    enrolled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Interested = mongoose.model('Interested', interestedSchema);

export default Interested;
