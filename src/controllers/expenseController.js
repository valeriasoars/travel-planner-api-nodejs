import expenseService from "../services/expenseService.js"
import { errorResponse, sucessResponse } from "../helpers/response.js"

const listExpenseByTrip = async(req, res) =>{
    try{
        const expense = await expenseService.listByTrip(req.params.tripId)
        sucessResponse(res, "Despesas encontradas com sucesso", expense, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar despesa", error.message, 400)
    }
}

const createExpense = async(req, res) => {
    try{
        const {tripId} = req.params
        const data = { ...req.body, tripId}
        const newExpense = await expenseService.create(data)
        sucessResponse(res, "Despesa criada com sucesso", newExpense, 200)
    }catch(error){
        errorResponse(res, "Erro ao criar despesa", error.message, 400)
    }
}

const updeteExpense = async(req, res) => {
    try{
        const expenseUpdated = await expenseService.update(req.params.id, req.body)

        if(!expenseUpdated) return errorResponse(res, "Despesa não encontrada para atualização")

        sucessResponse(res, "Despesa atualizada com sucesso", expenseUpdated, 200)
    }catch(error){
        errorResponse(res, "Erro ao atualizar despesa", error.message, 400)
    }
}

const deleteExpense = async(req, res) => {
    try{
        const expense = await expenseService.remove(req.params.id)
        if(!expense) return errorResponse(res, "Despesa não encontrada para exclusão", null, 400)
        sucessResponse(res, "Despesa deletada com sucesso", expense, 200)
    }catch(error){
        errorResponse(res, "Erro ao deletar despesa", error.message, 400)
    }
}

const getRemainingBalance = async(req, res) => {
    try{
        const balance = await expenseService.getRemainingBalance(req.params.tripId)
        sucessResponse(res, "Saldo obtido com sucesso", balance, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar despesa", error.message, 400)
    }
}

export default {listExpenseByTrip, createExpense, updeteExpense, deleteExpense, getRemainingBalance }