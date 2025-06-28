import mongoose from "mongoose"
import user from "./user.js"
import Expense from "./expense.js"
import DailyPlanning from "./dailyPlanning.js"
import Activity from "./activity.js"


const tripSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    totalBudget:{
        type: Number,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['cancelada', 'concluida', 'planejamento'],
        default: 'planejamento'
    }, 
}, {timestamps: true})



tripSchema.pre("findOneAndDelete", async function (next) {
  const trip = await this.model.findOne(this.getQuery())
  if (!trip) return next()

  await Expense.deleteMany({ tripId: trip._id })

  const plans = await DailyPlanning.find({ tripId: trip._id })

  for (const plan of plans) {
    await Activity.deleteMany({ planningId: plan._id })
  }

  await DailyPlanning.deleteMany({ tripId: trip._id })
  next()
})


export default mongoose.model('Trip', tripSchema)