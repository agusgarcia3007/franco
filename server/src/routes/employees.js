import express from "express";
import Employee from "../models/employee.js";
import Rating from "../models/rating.js";

const router = express.Router();

router.get("/comments", async (req, res) => {
  try {
    const comments = await Rating.find(
      {
        $and: [{ comment: { $ne: null } }, { comment: { $ne: "" } }],
      },
      "comment employeeID created_at"
    ).sort({ createdAt: -1 });

    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
