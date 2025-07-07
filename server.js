import express from "express"
import dotenv from "dotenv"
import connectDB from  "./src/config/db.js"
import cors from "cors"

import userRoutes from "./src/routes/userRoutes.js"
import tripRoutes from "./src/routes/tripRoutes.js"
import activityRoutes from "./src/routes/activityRoutes.js"
import dailyPlanningRoutes from "./src/routes/dailyPlanningRoutes.js"
import categoryExpenseRoutes from "./src/routes/categoryExpenseRoutes.js"
import expenseRoutes from "./src/routes/expenseRoutes.js"

dotenv.config()
connectDB()



const app = express()
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/trip", tripRoutes)
app.use("/api/activity", activityRoutes)
app.use("/api/planning", dailyPlanningRoutes)
app.use("/api/categoryExpense", categoryExpenseRoutes)
app.use("/api/expense", expenseRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`)
})