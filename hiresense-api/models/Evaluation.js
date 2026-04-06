const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    candidateName: { type: String, default: "Anonymous Candidate" },
    sessionTitle: { type: String, default: "Frontend Engineering - Medium" },
    score: { type: Number, required: true },
    strengths: { type: String, required: true },
    improvements: { type: String, required: true },
    improvedPitch: { type: String, required: true },
    // A placeholder if we decide to store the actual file path or S3 URL
    audioFilePath: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
