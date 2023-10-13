import { Router } from "express";
import { prisma } from "../db-connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

router.post("/employees", async (req, res) => {
  try {
    const employee = await prisma.employee.create({
      data: req.body,
    });
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/employees/:id", async (req, res) => {
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

router.delete("/employees/:id", async (req, res) => {
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

router.post("/login", async (req, res) => {
  const fixedAdminPassword = "admin5840";
  const secretKey = "bote";
  try {
    const { username, password, rememberMe } = req.body;

    if (
      username !== "admin" ||
      !bcrypt.compareSync(password, await bcrypt.hash(fixedAdminPassword, 10))
    ) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ username }, secretKey, { expiresIn: "3h" });

    let refreshToken = null;
    if (rememberMe) {
      refreshToken = jwt.sign({ username }, secretKey, { expiresIn: "7d" });
    }

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
