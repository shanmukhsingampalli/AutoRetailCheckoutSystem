import { Router } from "express";
import verifyAdmin from "../middleware/auth.middleware.js";
import { loginUser } from "../controllers/admin.controller.js";

const router = Router();

router.route("/login").post(loginUser);

export default router;