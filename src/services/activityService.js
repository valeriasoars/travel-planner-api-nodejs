import Activity from "../models/activity.js"


const create = async (data) => {
    const {planningId, time} = data

    const conflict = await Activity.findOne({planningId, time})
    if(conflict) throw new Error("Já exite uma atividade programada para esse horário")

    return await Activity.create(dados)
}

const list = async(planningId) => {
    return await Activity.find({planningId})
}

const update = async(id, data) => {
    const {planningId, time} = data

    const conflict = await Activity.findOne({
        _id: {$ne: id},
        planningId,
        time
    })

    if(conflict) throw new Error("Já existe outra atividade neste horário")
    
    return await Activity.findByIdAndUpdate(id, data, {new: true})
}

const remove = async(id) => {
    return await Activity.findByIdAndDelete(id)
}

export default{ list, create, update, remove}