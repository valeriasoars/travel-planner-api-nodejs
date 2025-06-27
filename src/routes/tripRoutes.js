import express from 'express'
import tripController from '../controllers/tripController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/create", authMiddleware, tripController.createTrip)
router.get("/list", authMiddleware, tripController.listTripByUser)
router.get("/status", authMiddleware, tripController.listTripByStatus)
router.get("/:id", authMiddleware, tripController.getTripById)
router.put("/:id", authMiddleware, tripController.updateTrip)
router.delete("/:id", authMiddleware, tripController.deleteTrip)

export default router