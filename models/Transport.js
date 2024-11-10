import mongoose from "mongoose";

const schema = mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
        required: true
    },
    busName: {
        type: String,
        required: true,
    },
    busNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    driverNumber: {
        type: String
    }
},
    { timestamps: true }
)

const Transport = mongoose.model("Transport", schema);
export default Transport; 
