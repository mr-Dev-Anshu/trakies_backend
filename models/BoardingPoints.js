import mongoose, { mongo } from "mongoose";

const schema = mongoose.Schema({
    transportId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    boardingPointName: {
        type: String,
        required: true
    },
    boardingPointTime: {
        type: String ,
        required: true
    },
    boardingPointDate: {
        type: Date,
        required: true
    } , 
    location:{
         type:String , 
         required:true 
    }
}, { timestamps: true })

const BoardingPoint = mongoose.model("BoardingPoint", schema);
export default BoardingPoint; 