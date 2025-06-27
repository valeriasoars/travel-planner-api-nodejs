import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    categoryExpenseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryExpense',
        required: true
    },
    description:{
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Expense', expenseSchema)