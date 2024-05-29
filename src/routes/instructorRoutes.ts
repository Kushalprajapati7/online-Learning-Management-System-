import instructorController from "../controllers/instructorController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

router.post('/add', instructorController.createInstrctor)
router.get('/show', verifyToken, instructorController.getInstructor)

export default router;