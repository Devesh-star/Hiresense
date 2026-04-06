const { evaluateAnswer } = require("../services/aiService");
const { transcribeAudio } = require("../services/transcriptionService");
const Evaluation = require("../models/Evaluation");

exports.processEvaluation = async (req, res) => {
  try {
    // 1. Validate file exists
    // The uploaded file buffer is available at req.file.buffer since we use multer memoryStorage()
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No audio file uploaded" });
    }

    // 2. Transcribe the uploaded audio using OpenAI Whisper
    const transcription = await transcribeAudio(req.file.buffer, req.file.originalname);
    console.log("🎤 Transcribed Text:", transcription);

    // In a real app, the question is provided by the frontend payload
    const question = req.body.question || "Explain the Virtual DOM and why React uses it.";

    // 3. Call our AI Service with the transcribed text
    const evaluationResult = await evaluateAnswer(question, transcription);

    // 3. Save the result to MongoDB 
    const newRecord = new Evaluation({
      candidateName: req.body.candidateName || "Alex Rivera",
      sessionTitle: req.body.sessionTitle || "Frontend Engineering - Medium",
      score: evaluationResult.overallScore,
      strengths: evaluationResult.strengths ? evaluationResult.strengths.join(", ") : "None",
      improvements: evaluationResult.weaknesses ? evaluationResult.weaknesses.join(", ") : "None",
      improvedPitch: evaluationResult.improvedAnswer || "No improvement generated",
      audioFilePath: "memory-buffer", // Mock path as we're not saving the file
    });

    const savedRecord = await newRecord.save();

    // 4. Return the evaluation payload back to the frontend
    res.status(200).json({
      success: true,
      data: savedRecord,
    });
  } catch (error) {
    console.error("Evaluation Error:", error);
    res.status(500).json({ success: false, message: "Server error during evaluation" });
  }
};
