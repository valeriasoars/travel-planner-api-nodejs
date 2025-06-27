import { errorResponse, sucessResponse } from "../helpers/response.js"
import tripService from "../services/tripService.js"

const createTrip = async (req, res) => {
    try{
        const newTrip = await tripService.create(req.body, req.userId)
        sucessResponse(res, "Viagem criada com sucesso", newTrip, 201)
    }catch(error){
        errorResponse(res, "Erro ao criar viagem", error.message, 400)
    }
}

const listTripByUser = async(req, res) => {
    const userId = req.userId
    try{
        const trips = await tripService.listTrip(userId)
        sucessResponse(res, "Viagens encontradas com sucesso", trips, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar viagens", error.message, 400)
    }
}

const listTripByStatus = async(req, res) => {
    try{
        const userId = req.userId
        const {status} = req.query

        const trips = await tripService.listTrip(userId, status)
        sucessResponse(res, "Vigens encontradas com sucesso", trips, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar viagens", error.message, 400)
    }
}


const getTripById = async(req, res) => {
    try{
        const trip = await tripService.getTripById(req.params.id)
        if(!trip) errorResponse(res, "Viagem não encontrada", error.error, 400)
        sucessResponse(res, "Viagem encontrada com sucesso", trip, 200)
    }catch(error){
        errorResponse(res, "Erro ao buscar viagem", error.message, 400)
    }
}

const updateTrip = async(req, res) => {
    try{
        const tripUpdated = await tripService.updateTrip(req.params.id, req.body)
        if(!tripUpdated) return errorResponse(res, "Viagem não encontrada para atualização", null, 404)

        sucessResponse(res, "Viagem atualizada com sucesso", tripUpdated, 200)
    }catch(error){
        errorResponse(res, "Erro ao atualizar viagem", error.message, 400)
    }
}

const deleteTrip = async(req, res) => {
    try{
        const tripRemoved = await tripService.deleteTrip(req.params.id)
        if(!tripRemoved) return errorResponse(res, "Viagem não encontrada para exclusão", null, 404)
        
        sucessResponse(res, "Viagem deletada com sucesso", tripRemoved, 200)
    }catch(error){
        errorResponse(res, "Erro ao deletar viagem", error.message, 400)
    }
}


export default { createTrip, listTripByUser, listTripByStatus, getTripById, updateTrip, deleteTrip}