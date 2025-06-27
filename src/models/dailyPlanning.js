import mongoose from "mongoose"

const DailyPlanningSchema = new mongoose.Schema({
    tripId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})

export default mongoose.model('DailyPlanning', DailyPlanningSchema)