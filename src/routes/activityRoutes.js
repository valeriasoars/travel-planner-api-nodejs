import authMiddleware from "../middleware/authMiddleware.js"
import express from 'express'
import activityController from "../controllers/activityController.js"

const router = express.Router()

router.get("/:planningId", authMiddleware, activityController.listActivity)
router.post("/:planningId", authMiddleware, activityController.createActivity)
router.put("/:id", authMiddleware, activityController.updateActivity)
router.delete("/:id", authMiddleware, activityController.deleteActivity)


export default router