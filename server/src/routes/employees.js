import express from "express";
import Employee from "../models/employee.js";
import Rating from "../models/rating.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find({});
    const employeeData = [];

    for (const emp of employees) {
      const ratings = await Rating.find({ employeeID: emp._id });
      const avgRating = +(
        ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1)
      ).toFixed(2);
      employeeData.push({
        employee: { name: emp.name, id: emp._id },
        avgRating,
        voteCount: ratings.length,
      });
    }

    res.status(200).send(employeeData);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
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
    const relatedComments = await Rating.deleteMany({
      employeeID: req.params.id,
    });
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).send();
    }
    res.send({ message: "Employee deleted successfully", relatedComments });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  const fixedAdminPassword = "admin5840";
  const secretKey = crypto.randomUUID();
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
