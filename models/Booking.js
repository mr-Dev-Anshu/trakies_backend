import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true
  },
  accommodation: {
    type: Boolean,
    required: true
  },
  isTrekker: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
