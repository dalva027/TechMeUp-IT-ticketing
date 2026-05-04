import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";

export const getTickets = async (req: AuthRequest, res: Response) => {
  try {
    const { status, priority, page = "1", limit = "20" } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;

    // Technicians and admins see all tickets; requesters see only theirs
    if (req.userRole === "REQUESTER" && req.userId) {
      where.requesterId = req.userId;
    }

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
        include: { requester: { select: { id: true, name: true } } },
      }),
      prisma.ticket.count({ where }),
    ]);

    res.json({ tickets, total, page: pageNum, totalPages: Math.ceil(total / limitNum) });
  } catch (error) {
    console.error("Get tickets error:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        requester: { select: { id: true, name: true, email: true } },
        assignee: { select: { id: true, name: true, email: true } },
        comments: {
          orderBy: { createdAt: "asc" },
          include: { user: { select: { id: true, name: true } } },
        },
      },
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Get ticket error:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

export const createTicket = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { title, description, priority, assigneeId } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        requesterId: req.userId,
        assigneeId: assigneeId || null,
      },
      include: {
        requester: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error("Create ticket error:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

export const updateTicket = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { id } = req.params;
    const { title, description, status, priority, assigneeId } = req.body;

    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Requesters can only update their own tickets if OPEN
    if (req.userRole === "REQUESTER" && ticket.requesterId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updated = await prisma.ticket.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
        ...(assigneeId !== undefined && { assigneeId }),
      },
      include: {
        requester: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Update ticket error:", error);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

export const deleteTicket = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.findUnique({ where: { id } });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (req.userRole !== "ADMIN" && ticket.requesterId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.ticket.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Delete ticket error:", error);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};
