import { errorResponse, sucessResponse } from "../helpers/response.js"
import dailyPlanningService from "../services/dailyPlanningService.js"


const listDailyPlanning = async(req, res) => {
    try{
        const planning = await dailyPlanningService.list(req.params.tripId)
        sucessResponse(res, "Dias da viagem encontrados com sucesso", planning, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar os dias da viagem", error.message, 400)
    }
}

export default {listDailyPlanning}