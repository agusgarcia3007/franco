import express from "express";
import Rating from "../models/rating.js";

const router = express.Router();

router.post("/rating", async (req, res) => {
  try {
    const { rating } = req.body;

    if (rating < 0 || rating > 5) {
      return res.status(400).send({ error: "Rating must be between 0 and 5" });
    }

    const newRating = new Rating(req.body);
    await newRating.save();
    res.status(201).send(newRating);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/reset", async (req, res) => {
  try {
    await Rating.deleteMany({});
    res.status(200).send("All ratings reset");
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
