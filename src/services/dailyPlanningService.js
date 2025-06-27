import DailyPlanning from "../models/dailyPlanning.js"

const list = async(tripId) => {
    return await DailyPlanning.find({tripId})
}

export default {list}

