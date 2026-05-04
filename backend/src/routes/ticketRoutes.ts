import { Router } from "express";
import {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, getTickets);
router.post("/", authenticate, createTicket);
router.get("/:id", authenticate, getTicketById);
router.put("/:id", authenticate, updateTicket);
router.delete("/:id", authenticate, deleteTicket);

export default router;
