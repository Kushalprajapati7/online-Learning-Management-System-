import enrollmentController from "../controllers/enrollmentController"
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import Permission from "../middleware/rbacAuthMiddlware";
import { Role } from "../utils/constant";

const router = Router();

router.post('/add', verifyToken, Permission([Role.Admin], 'Enrollment','write'),enrollmentController.createEnrollment);
// router.put('/update/:id', verifyToken, authorizeInstructor, );
// router.delete('/delete/:id', verifyToken, authorizeInstructor, );
// router.get('/', verifyToken, authorizeInstructor, );

export default router;