import { check } from "express-validator";
import User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async({name, email, password, confirmedPassord}) => {

    if(!name || !email || !password || !confirmedPassord){
        throw new Error("Todos os campos são obrigatórios")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(email)){
        throw new Error("E-mail invalido")
    }

    if(password.length < 8){
        throw new Error("A senha deve ter no mínimo 8 caracteres")
    }

    if(password !== confirmedPassord){
       throw new Error("As senhas não conferem")
    }

    const userExisting = await User.findOne({email})
    if(userExisting){
        throw new Error("Usuario já existe")
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({name, email, password: passwordHash})
    await user.save()
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        dateCreated: user.dateCreated
    }
}

export const login = async({email, password}) => {

    if(!email || !password){
        throw new Error("E-mail e senha são obrigatorios")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
        throw new Error("E-mail inválido")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new Error("Usuário não encontrado")
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        throw new Error("Credenciais inválidas")
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "24h"
    })

    return{ user: user._id, token}
}

export const getUser = async (userId) => {
    const user = await User.findById(userId)
    if(!user) throw new Error("Usuário não encontrado")
    return user
}

export const deleteUser = async(userId) => {
    const user = await User.findByIdAndDelete({_id: userId})
    if(!user){
        throw new Error("Usuário não encontrado")
    }
}