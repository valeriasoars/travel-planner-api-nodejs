import CategoryExpense from "../models/categoryExpense.js"

const list = async() =>{
    return await CategoryExpense.find()
}

const create = async(data) => {
    return await CategoryExpense.create(data)
}

const getById = async(id) => {
    return await CategoryExpense.findById(id)
}

const remove = async(id) => {
    return await CategoryExpense.findByIdAndDelete(id)
}

export default {list, create, getById, remove}