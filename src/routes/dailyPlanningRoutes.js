import express from "express"
import dailyPlanningController from "../controllers/dailyPlanningController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/:tripId", authMiddleware, dailyPlanningController.listDailyPlanning)

export default router