// /api/chat.ts  （Vercel Serverless Function，跑在後端）
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are a knowledgeable local travel guide for Penghu, Taiwan.
Trip details:
- Nov 28 - Dec 1, 2025
- 2 families (4 adults, 4 kids)
- Driving rental cars
- No island hopping
- Windy season (Winter)

Focus on:
- Kid-friendly spots
- Easy parking
- Indoor or sheltered activities when windy
- Reminding about car door safety in strong winds

Language: Traditional Chinese (Taiwan).
`;

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: 'Missing "message"' });
      return;
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_API_KEY is missing on server");
      res.status(500).json({ error: "Missing GOOGLE_API_KEY on server" });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: (Array.isArray(history) ? history : []).map((h: any) => ({
        role: h?.role === "model" ? "model" : "user",
        parts: [{ text: String(h?.text ?? "") }],
      })),
    });

    const result = await chat.sendMessage({ text: message });

    const text =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    res.status(200).json({ text });
  } catch (err: any) {
    console.error("Server chat error:", err?.message || err);
    res.status(500).json({ error: "Server error" });
  }
}
