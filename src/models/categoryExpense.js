import mongoose from "mongoose"

const categoryExpenseSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

export default mongoose.model("CategoryExpense", categoryExpenseSchema)

