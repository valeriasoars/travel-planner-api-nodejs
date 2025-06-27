import mongoose from "mongoose"

const ActivitySchema = new mongoose.Schema({
    planningId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DailyPlanning",
        required: true
    },
    activity:{
        type: String,
        required: true
    },
    observation: String,
    time: String,
    location: String
})

export default mongoose.model("Activity", ActivitySchema)