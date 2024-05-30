import assignmentController from "../controllers/assignmentController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import Permission from "../middleware/rbacAuthMiddlware";
import { Role } from "../utils/constant";
const router = Router();

router.post('/add', verifyToken, Permission([Role.Admin,Role.Instructor], 'Assignment','write'),assignmentController.addAssignment);
router.put('/update/:id', verifyToken, Permission([Role.Admin,Role.Instructor], 'Assignment','edit'),assignmentController.updateAssignment);
router.delete('/delete/:id', verifyToken, Permission([Role.Admin,Role.Instructor], 'Assignment','delete'),assignmentController.deleteAssignment);

export default router;
