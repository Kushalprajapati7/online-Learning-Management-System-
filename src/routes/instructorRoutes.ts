import instructorController from "../controllers/instructorController";
import { Router } from "express";

const router = Router();

router.post('/add', instructorController.createInstrctor)

export default router;