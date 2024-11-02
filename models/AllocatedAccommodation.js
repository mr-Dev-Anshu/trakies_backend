import mongoose from "mongoose";

const schema = mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    accommodationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accommodation",
        required: true
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
        required: true
    },
    roomNumber: {
        type: Number,
        required: true,
    },
    roomType: {
        type: String,
        required: true
    },
    occupancy: {
        type: String,
        required: true
    },
})

const AllocatedAccommodation = mongoose.model("AllocatedAccommodation", schema);
export default AllocatedAccommodation; 
