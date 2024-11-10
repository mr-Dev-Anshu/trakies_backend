import mongoose from "mongoose";

const schema = mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    transportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accommodation",
        required: true
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
        required: true
    },
})

const AllcatedTransport = mongoose.model("AllcatedTransport", schema);
export default AllcatedTransport; 
