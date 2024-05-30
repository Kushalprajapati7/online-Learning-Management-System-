import instructorController from "../controllers/instructorController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import Permission from "../middleware/rbacAuthMiddlware";
import { Role } from "../utils/constant";

const router = Router();

router.post('/add', verifyToken, Permission([Role.Admin,Role.Instructor],'Instructor','write'),instructorController.createInstrctor)
router.get('/show', verifyToken, Permission([Role.Admin,Role.Instructor],'Instructor','read'),instructorController.getInstructor)

export default router;