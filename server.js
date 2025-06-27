import express from "express"
import dotenv from "dotenv"
import connectDB from  "./src/config/db.js"

import userRoutes from "./src/routes/userRoutes.js"
import tripRoutes from "./src/routes/tripRoutes.js"
import activityRoutes from "./src/routes/activityRoutes.js"

dotenv.config()
connectDB()

const app = express()
app.use(express.json())


app.use("/api/user", userRoutes)
app.use("/api/trip", tripRoutes)
app.use("/api/activity", activityRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`)
})