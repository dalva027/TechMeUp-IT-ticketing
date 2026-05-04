import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";

export const getComments = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { ticketId },
      orderBy: { createdAt: "asc" },
      include: { user: { select: { id: true, name: true } } },
    });
    res.json(comments);
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const createComment = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { ticketId, content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Content is required" });
    }

    const comment = await prisma.comment.create({
      data: { ticketId, userId: req.userId, content: content.trim() },
      include: { user: { select: { id: true, name: true } } },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};
