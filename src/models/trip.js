import mongoose from "mongoose"
import user from "./user.js"

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

export default mongoose.model('Trip', tripSchema)