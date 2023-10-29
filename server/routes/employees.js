import { Router } from "express";
import { prisma } from "../db-connect.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    const employeeData = [];

    for (const emp of employees) {
      const ratings = await prisma.rating.findMany({
        where: { employeeID: emp.id },
      });
      const avgRating = +(
        ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1)
      ).toFixed(2);

      const comments = await prisma.rating.findMany({
        where: { employeeID: emp.id },
      });

      employeeData.push({
        employee: { name: emp.name, id: emp.id },
        avgRating,
        voteCount: ratings.length,
        comments,
      });
    }

    res.status(200).send(employeeData);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/employees", authMiddleware, async (req, res) => {
  try {
    const employee = await prisma.employee.create({
      data: req.body,
    });
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/employees/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await prisma.employee.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/employees/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.rating.deleteMany({
      where: { employeeID: parseInt(req.params.id) },
    });
    const employee = await prisma.employee.delete({
      where: { id: parseInt(req.params.id) },
    });

    if (!employee) {
      return res.status(404).send();
    }
    res.send({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
