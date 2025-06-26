import { errorResponse } from "../helpers/response.js"
import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(!token){
        errorResponse(res, "Acesso negado. Nenhum token fornecido", null, 401)
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    }catch(error){
        errorResponse(res, "Token inválido", error.message, 400)
    }
}

export default authMiddleware