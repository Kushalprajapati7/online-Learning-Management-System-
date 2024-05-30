import courseController from "../controllers/courseController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import Permission from "../middleware/rbacAuthMiddlware";
import { Role } from "../utils/constant";

const router = Router();

router.post('/add', verifyToken, Permission([Role.Admin, Role.Instructor], 'Course','write'), courseController.createCourse);
router.put('/update/:id', verifyToken, Permission([Role.Admin,Role.Instructor], 'Course','edit'), courseController.updateCourse);
router.delete('/delete/:id', verifyToken, Permission([Role.Admin,Role.Instructor], 'Course','delete'),  courseController.deleteCourse);
router.get('/ListOfCourses', verifyToken, Permission([Role.Admin,Role.Instructor,Role.Student], 'Course','read'), courseController.coursesByInstructor);
router.get('/', verifyToken, Permission([Role.Admin,Role.Instructor,Role.Student], 'Course','read'), courseController.getCourse);
router.get('/allCourses', verifyToken,Permission([Role.Admin, Role.Instructor, Role.Student],'Course','read'), courseController.allCourse);

export default router;