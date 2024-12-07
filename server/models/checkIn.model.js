const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    moodRating: {
      type: Number,
      required: [true, "Mood rating is required"],
      min: 1,
      max: 10,
    },
    stressLevel: {
      type: String,
      required: [true, "Stress level is required"],
      enum: ["Low", "Medium", "High"],
    },
    journalEntry: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CheckIn", checkInSchema);
