import Expense from "../models/expense.js"
import Trip from "../models/trip.js"


const listByTrip = async(tripId) => {
    return await Expense.find({tripId})
    .populate("categoryExpenseId")
    .sort({ createdAt: -1}) //  Ordena os gastos pela data de criação, do mais recente para o mais antigo
}

const create = async(data) =>{
    const {tripId, value, date} = data

    const trip = await Trip.findById(tripId)
    if(!trip) throw new Error("Viagem não encontrada")
    
    const dateExpense = new Date(date)
    if(dateExpense < trip.startDate || dateExpense > trip.endDate){
        throw new Error("A data da despesa está fora do período da viagem")
    }

    // Calcula o total atual de gastos
    const totalExpense = await Expense.aggregate([
        { $match: {tripId: trip._id}},
        { $group: { _id: null, total: {$sum: "$value"}}}
    ])

    const currentValueExpense = totalExpense[0]?.total || 0
    const finalValue = currentValueExpense + value

    if(finalValue > trip.totalBudget){
        throw new Error (`O valor excede o orçamento da viagem. Orçamento: R$ ${trip.totalBudget}`)
    }

    return await Expense.create(data)
}

const update = async(id, data) => {
    const currentExpense = await Expense.findById(id)
    if(!currentExpense) throw new Error("Despesa não encontrada")

    const trip = await Trip.findById(currentExpense.tripId)
    if(!trip) throw new Error("Viagem não encontrada")

    // Calcula o total dos gastos da viagem, excluindo o gasto atual
    const totalExpense = await Expense.aggregate([
        {
            $match: {
                tripId: trip._id,
                _id: { $ne: currentExpense._id }
            }
        },
        {
            $group : {
                _id: null,
                total: {$sum: "$value"}
            }
        }
    ])

    const totalNoCurrent = totalExpense[0]?.total || 0
    const newTotal = totalNoCurrent + data.value

    if(newTotal > trip.totalBudget){
        throw new Error (`O valor excede o orçamento da viagem. Orçamento: R$ ${trip.totalBudget}`)
    }

    return await Expense.findByIdAndUpdate(id, data, {new: true})
}

const remove = async(id) => {
    return await Expense.findByIdAndDelete(id)
}

const getRemainingBalance = async(tripId) => {
    const trip = await Trip.findById(tripId)
    if(!trip) throw new Error("Viagem não encontrada")

    const totalExpense = await Expense.aggregate([
        { $match: {tripId: trip._id}},
        { $group: {_id: null, total: {$sum: "$value"}}}
    ])

    const totalSpent = totalExpense[0]?.total || 0
    const remainingBalance = trip.totalBudget - totalSpent

    return{
        budget: trip.totalBudget,
        totalSpent,
        remainingBalance: parseFloat(remainingBalance.toFixed(2))
    }
}

export default {listByTrip, create, update, remove, getRemainingBalance}