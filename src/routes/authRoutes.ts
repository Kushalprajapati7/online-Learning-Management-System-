import authController from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post('/', authController.login)

export default router;