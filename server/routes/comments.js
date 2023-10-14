import { Router } from "express";
import { prisma } from "../db-connect.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/comments", authMiddleware, async (req, res) => {
  try {
    const comments = await prisma.rating.findMany({
      include: {
        employee: true,
      },
    });
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/comments/:employeeID", authMiddleware, async (req, res) => {
  try {
    const comments = await prisma.rating.findMany({
      where: {
        employeeID: parseInt(req.params.employeeID),
      },
      include: {
        employee: true,
      },
    });
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
