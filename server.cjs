require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ExamVerse AI"
  });
});

app.post("/api/ask", async (req, res) => {
  try {
    const { exam, subject, chapter, question } = req.body;

    if (!exam || !question) {
      return res.status(400).json({
        error: "Exam and question required."
      });
    }

    console.log(`📚 Question: ${question}`);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are ExamVerse AI.

Exam: ${exam}
Subject: ${subject || "General"}
Chapter: ${chapter || "General"}

Student Question:
${question}

Give an accurate, clear and useful answer for a student.
Use simple language and structured points when appropriate.`,
    });

    const answer = response.text;

    console.log("✅ Gemini response received");

    res.json({
      answer: answer || "No answer received."
    });

  } catch (error) {
    console.error("❌ GEMINI ERROR:");
    console.error(error);

    res.status(500).json({
      error: "AI service temporarily unavailable.",
      details: error?.message || "Unknown error"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 ExamVerse API running on port ${PORT}`);
});
