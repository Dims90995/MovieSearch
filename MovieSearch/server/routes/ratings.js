const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");
const { verifyToken } = require("../middleware/auth");


router.post("/", verifyToken, async (req, res) => {
  const { movieId, rating } = req.body;
  const userId = req.user.id;

  console.log("Incoming rating:", { userId, movieId, rating });

  try {
    const existing = await Rating.findOneAndUpdate(
      { movieId, userId },
      { rating },
      { upsert: true, new: true }
    );
    res.status(200).json(existing);
  } catch (err) {
    console.error("Rating save failed:", err);
    res.status(500).json({ error: "Failed to save rating" });
  }
});


router.get("/average/:movieId", async (req, res) => {
  const { movieId } = req.params;

  try {
    const result = await Rating.aggregate([
      { $match: { movieId: Number(movieId) } },
      { $group: { _id: "$movieId", avgRating: { $avg: "$rating" } } }
    ]);
    res.status(200).json({ average: result[0]?.avgRating || 0 });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch average rating" });
  }
});


router.get("/user/:movieId", verifyToken, async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id;

  try {
    const rating = await Rating.findOne({ movieId, userId });
    res.status(200).json({ rating: rating?.rating || 0 });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user rating" });
  }
});

module.exports = router;
