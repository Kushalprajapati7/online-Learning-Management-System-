import assignmentController from "../controllers/assignmentController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { authorizeInstructor } from "../middleware/roleAuthorization";
const router = Router();

router.post('/add', verifyToken, authorizeInstructor,assignmentController.addAssignment);
router.put('/update/:id', verifyToken, authorizeInstructor,assignmentController.updateAssignment);
router.delete('/delete/:id', verifyToken, authorizeInstructor,assignmentController.deleteAssignment);

export default router;
