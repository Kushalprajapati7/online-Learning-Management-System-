import enrollmentController from "../controllers/enrollmentController"
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { authorizeInstructor } from "../middleware/roleAuthorization";

const router = Router();

router.post('/add', verifyToken, enrollmentController.createEnrollment);

router.put('/update/:id', verifyToken, authorizeInstructor, );

router.delete('/delete/:id', verifyToken, authorizeInstructor, );

router.get('/', verifyToken, authorizeInstructor, );

export default router;