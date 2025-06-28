import mongoose from "mongoose"
import Trip from "./trip.js"
import Expense from "./expense.js"
import DailyPlanning from "./dailyPlanning.js"
import Activity from "./activity.js"

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now}
})


// deletar em cascata
UserSchema.pre("findOneAndDelete", async function(next){
    const user = await this.model.findOne(this.getQuery())
    if(!user) return next()

    const trips = await Trip.find({userId: user._id})

    for(const trip of trips){
        await Expense.deleteMany({tripId: trip._id})

        const planning = await DailyPlanning.find({tripId: trip._id})

        for(const plan of planning){
            await Activity.deleteMany({planningId: plan._id})
        }

        await DailyPlanning.deleteMany({tripId: trip._id})

        await Trip.findByIdAndDelete(trip._id)
    }

    next()
})

export default mongoose.model("User", UserSchema)