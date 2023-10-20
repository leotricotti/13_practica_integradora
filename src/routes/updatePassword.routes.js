import { Router } from "express";
import updatePassword from "../controllers/updatePassword.controller";

const router = Router();

router.put("/", updatePassword);

export default router;
