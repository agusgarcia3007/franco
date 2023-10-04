import express from "express";
import Employee from "../models/employee.js";
import Rating from "../models/rating.js";

const router = express.Router();

// Crear un nuevo empleado
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find({});
    const employeeData = [];

    for (const emp of employees) {
      const ratings = await Rating.find({ employeeID: emp._id });
      const avgRating =
        ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);
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

router.get("/employee/:employeeID/rating", async (req, res) => {
  try {
    const ratings = await Rating.find({ employeeID: req.params.employeeID });
    const avgRating =
      ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);
    res.status(200).send({ avgRating, voteCount: ratings.length });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
