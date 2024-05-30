import studentController from "../controllers/studentController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import ErrorHandler from "../middleware/ErrorHandler";
import Permission from "../middleware/rbacAuthMiddlware";
import { Role } from "../utils/constant";

const router = Router();

router.post('/add',Permission([Role.Admin,Role.Student], 'Student','write'),studentController.createStudent);
router.get('/all',verifyToken,Permission([Role.Admin,Role.Student], 'Student','read'), studentController.showStudents)
router.put('/update/:id',verifyToken, Permission([Role.Admin,Role.Student], 'Student','edit'),studentController.updatedStudent)
router.delete('/delete/:id',verifyToken, Permission([Role.Admin,Role.Student], 'Student','delete'),studentController.deleteStudent)
router.get('/ById/:id', verifyToken, Permission([Role.Admin,Role.Student], 'Student','read'),studentController.showStudentById)

export default router;