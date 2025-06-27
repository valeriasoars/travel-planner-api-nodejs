import express from 'express'
import expenseController from '../controllers/expenseController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get("/:tripId", authMiddleware, expenseController.listExpenseByTrip)
router.get("/balance/:tripId", authMiddleware, expenseController.getRemainingBalance)
router.post("/:tripId", authMiddleware, expenseController.createExpense)
router.put("/:id", authMiddleware, expenseController.updeteExpense)
router.delete("/:id", authMiddleware, expenseController.deleteExpense)

export default router