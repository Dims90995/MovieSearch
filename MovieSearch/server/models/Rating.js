
const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
  movieId: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
}, { timestamps: true })

ratingSchema.index({ movieId: 1, userId: 1 }, { unique: true })

module.exports = mongoose.model("Rating", ratingSchema)
