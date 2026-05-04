import { Router } from "express";
import { getComments, createComment } from "../controllers/commentController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/ticket/:ticketId", authenticate, getComments);
router.post("/", authenticate, createComment);

export default router;
