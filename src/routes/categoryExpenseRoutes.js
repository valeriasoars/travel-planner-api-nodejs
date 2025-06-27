import authMiddleware from "../middleware/authMiddleware.js"
import express from 'express'
import categoryExpenseController from "../controllers/categoryExpenseController.js"

const router = express.Router()

router.get("/", authMiddleware, categoryExpenseController.listCategoryExpense)
router.get("/:id", authMiddleware, categoryExpenseController.getCategoryExpenseById)
router.post("/", authMiddleware, categoryExpenseController.createCategoryExpense)
router.delete("/:id", authMiddleware, categoryExpenseController.deleteCategoryExpense)

export default router