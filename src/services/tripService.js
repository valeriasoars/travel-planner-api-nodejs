import User from "../models/user.js"
import Trip from "../models/trip.js"
import DailyPlanning from '../models/dailyPlanning.js'
import Activity from "../models/activity.js"
import Expense from "../models/expense.js"

const create = async(tripData, userId) => {
    const user = await User.findById(userId)
    if(!user) throw new Error("Usuário não encontrado")
    
    const {startDate, endDate} = tripData

    if(new Date(endDate) < new Date(startDate)){
        throw new Error("A data de fim não pode ser menor que a data de inicio")
    }

    const conflictingTrips = await Trip.find({
        userId,
        startDate: {$lte: endDate},
        endDate: {$gte: startDate}
    })

    if(conflictingTrips.length > 0){
        throw new Error("Já existe uma viagem com essa data")
    }

    const newtrip = new Trip({...tripData, userId})
    await newtrip.save()


    const start = new Date(startDate)
    const end = new Date(endDate)
    let current = new Date(start)

    const dailyPlanning = []

    while(current <= end){
        dailyPlanning.push({
            tripId: newtrip._id,
            date: new Date(current)
        })
        current.setDate(current.getDate() + 1)
    }

    await DailyPlanning.insertMany(dailyPlanning)

    return newtrip

}

const listTrip = async (userId, status) =>{
    const filter = {userId}
    if(status) filter.status = status
    return await Trip.find(filter)
}

const getTripById = async(id) => {
    return await Trip.findById(id)
}

const updateTrip = async(id, newDataTrip) => {
    return await Trip.findByIdAndUpdate(id, newDataTrip, {new: true})
}

const deleteTrip = async(id) => {
    // await DailyPlanning.deleteMany({tripId: id})
    // await Expense.deleteMany({tripId: id})
    return await Trip.findByIdAndDelete(id)
}

export default {create, listTrip, getTripById, updateTrip, deleteTrip}