import express from "express";
import { register, login } from "../controllers/AuthController.js";
import { userVerification } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/', userVerification);
router.post("/register", register);
router.post('/login', login);

export default router;