const express = require("express");
const multer = require("multer");
const { processEvaluation } = require("../controllers/evaluateController");

const router = express.Router();

// Configure multer to store uploaded audio files in memory.
// It receives the audio blob sent by the frontend's MediaRecorder object.
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit audio to 50MB
});

// POST /api/evaluate
// Expects multipart/form-data with a file field strictly named "audio"
router.post("/", upload.single("audio"), processEvaluation);

module.exports = router;
