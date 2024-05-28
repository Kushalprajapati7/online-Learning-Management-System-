import courseController from "../controllers/courseController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { authorizeInstructor, authorizeStudent } from "../middleware/roleAuthorization";

const router = Router();

router.post('/add', verifyToken, authorizeInstructor, courseController.createCourse);
router.put('/update/:id', verifyToken, authorizeInstructor, courseController.updateCourse);
router.delete('/delete/:id', verifyToken, authorizeInstructor, courseController.deleteCourse);
router.get('/ListOfCourses', verifyToken, authorizeInstructor, courseController.coursesByInstructor);
router.get('/allCourses', verifyToken, authorizeStudent, courseController.allCourse);

export default router;