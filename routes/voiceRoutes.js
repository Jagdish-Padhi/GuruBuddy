import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/playVoice", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch("https://api.groq.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${process.env.GROQ_API_KEY}`,
      },

      body: JSON.stringify({
        model: "tts-1",
        voice: "nova",
        input: text,
      }),
    });

    const buffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(buffer).toString("base64");

    res.json({ success: true, audio: base64Audio });
  } catch (error) {
    console.error("Groq voice error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
