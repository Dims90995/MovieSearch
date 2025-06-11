const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Number, required: true },
  viewedAt: { type: Date, default: Date.now }
});

watchHistorySchema.index({ userId: 1, movieId: 1 }, { unique: true });

useEffect(() => {
  getWatchHistory().then(setMovies); 
}, []);


module.exports = mongoose.model("WatchHistory", watchHistorySchema);
