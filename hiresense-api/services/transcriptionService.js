const fs = require("fs");
const os = require("os");
const path = require("path");
const { OpenAI } = require("openai");

/**
 * Transcribe Audio using OpenAI Whisper API
 * Requires OPENAI_API_KEY environment variable.
 */
exports.transcribeAudio = async (fileBuffer, originalFilename) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing. Cannot transcribe audio.");
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  // Create a temporary file path
  // Ensure the extension remains intact for whisper parsing
  const ext = path.extname(originalFilename) || ".webm";
  const tempFilePath = path.join(os.tmpdir(), `hire-sense-audio-${Date.now()}${ext}`);

  try {
    // Write buffer to local temp disk
    fs.writeFileSync(tempFilePath, fileBuffer);

    // Call Whisper API
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-1",
    });

    return response.text;
  } catch (error) {
    console.error("❌ Transcription Error:", error.message);
    throw error;
  } finally {
    // Always cleanup the temp file afterward
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
};
