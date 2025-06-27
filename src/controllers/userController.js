import { errorResponse, sucessResponse } from "../helpers/response.js"
import * as userService from "../services/userService.js"

export const registerUser = async(req, res) => {
    try{
       const newUser = await userService.register(req.body)
       sucessResponse(res, "Usuario cadastrado com sucesso", newUser, 201)
    }catch(error){
        errorResponse(res, "Erro ao cadastrar usuário", error.message, 400)
    }
}

export const loginUser = async(req, res) => {
    try{
        const user = await userService.login(req.body)
        sucessResponse(res, "Usuário logado com sucesso", user, 201)
    }
    catch(error){
        errorResponse(res, "Erro ao tentar logar o usuário", error.message, 400)
    }
}

export const getUser = async(req, res) => {
    try{
        const user = await userService.getUser(req.userId)
        sucessResponse(res, "Usuário localizado", user, 200)
    }catch(error){
        errorResponse(res, "Erro!", error.message, 400)
    }
}


export const removeUser = async(req, res) => {
    try{
        await userService.deleteUser(req.userId)
        sucessResponse(res, "Usuário removido com sucesso", null, 200)
    }catch(error){
        errorResponse(res, "Erro!", error.message, 400)
    }
}

export default{
    registerUser, loginUser, getUser, removeUser
}