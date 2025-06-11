const express = require("express");
const router = express.Router();
const WatchHistory = require("../models/WatchHistory");
const { verifyToken } = require("../middleware/auth");


router.post("/", verifyToken, async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id;

  try {
    const history = await WatchHistory.findOneAndUpdate(
      { userId, movieId },
      { viewedAt: new Date() },
      { upsert: true, new: true }
    );
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to save watch history" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const history = await WatchHistory.find({ userId }).sort({ viewedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to load history" });
  }
});

module.exports = router;
