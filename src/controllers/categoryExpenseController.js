import categoryService from "../services/categoryExpenseService.js"
import { errorResponse, sucessResponse } from "../helpers/response.js"

const listCategoryExpense = async(req, res) => {
    try{
        const category = await categoryService.list()
        sucessResponse(res, "Categorias de despesas encontradas com sucesso", category, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar as categorias de despesas", error.message, 400)
    }
}

const getCategoryExpenseById = async(req, res) => {
    try{
        const category = await categoryService.getById(req.params.id)
        if(!category) return errorResponse(res, "Categoria de despesa não encontrada", null, 400)
        
        sucessResponse(res, "Categoria de despesa encontrada com sucesso", category, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar a categoria de despesa", error.message, 400)
    }
}

const createCategoryExpense = async(req, res) => {
    try{
        const newCategory = await categoryService.create(req.body)
        sucessResponse(res, "Categoria de despesa criada com sucesso", newCategory, 200)
    }catch(error){
        errorResponse(res, "Erro ao criar a categoria de despesa", error.message, 400)
    }
}

const deleteCategoryExpense = async(req, res) => {
    try{
        const category = await categoryService.remove(req.params.id)
        if(!category) return errorResponse(res, "Categoria de despesa não encontrada para exclusão", null, 400)

        sucessResponse(res, "Categoria de despesa deletada com sucesso", null, 200)
    }catch(error){
        errorResponse(res, "Erro ao deletar a categoria de despesa", error.message, 400)
    }
}

export default{ listCategoryExpense, getCategoryExpenseById, createCategoryExpense, deleteCategoryExpense}