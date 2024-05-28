import studentController from "../controllers/studentController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { authorizeInstructor } from "../middleware/roleAuthorization";

const router = Router();

router.post('/add', studentController.createStudent);
router.get('/all',verifyToken,authorizeInstructor, studentController.showStudents)
router.put('/update/:id',verifyToken, studentController.updatedStudent)
router.delete('/delete/:id',verifyToken, studentController.deleteStudent)
router.get('/ById/:id', verifyToken, authorizeInstructor, studentController.showStudentById)
export default router;