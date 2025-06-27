import { errorResponse, sucessResponse } from "../helpers/response.js"
import activityService from "../services/activityService.js"

const createActivity = async(req, res) => {
    try{
        const { planningId } = req.params

        const data = {...req.body, planningId }
        const newActivity =  await activityService.create(data)
        sucessResponse(res, "Atividade criada com sucesso", newActivity, 200)
    }catch(error){
        errorResponse(res, "Erro ao criar atividade", error.message, 400)
    }
}

const listActivity = async(req, res) => {
    try{
        const activities = await activityService.list(req.params.planningId)
        sucessResponse(res, "Atividades encontradas com sucesso", activities, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar atividades", error.message, 400)
    }
}

const updateActivity = async(req, res) => {
    try{
        const updatedActivity = await activityService.update(req.params.id, req.body)
        sucessResponse(res, "Atividade atualizada com sucesso", updatedActivity, 200)
    }catch(error){
        errorResponse(res, "Erro ao atualizar atividade", error.message, 400)
    }
}

const deleteActivity = async(req, res) => {
    try{
        await activityService.remove(req.params.id)
        sucessResponse(res, "Atividade deletada com sucesso", null, 200)
    }catch(error){
        errorResponse(res, "Erro ao deletar atividade", error.message, 400)
    }
}

export default {createActivity, listActivity, updateActivity, deleteActivity}
