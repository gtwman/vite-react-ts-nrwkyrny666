// api/chats.ts － Vercel Serverless Function（跑在後端）
// 這支程式只會在 server 上執行，看不到你的 API Key

import { GoogleGenAI } from "@google/genai";

export const config = {
  // 你要用 Edge 也可以，用預設 nodejs 也沒關係
  runtime: "edge",
};

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

type HistoryItem = { role: "user" | "model"; text: string };

export default async function handler(req: Request): Promise<Response> {
  try {
    // 只接受 POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method Not Allowed" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }

    // 解析前端 body
    let body: { message?: string; history?: HistoryItem[] } = {};
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: 'Missing "message"' }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 從後端環境變數拿 API Key（只存在 server）
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_API_KEY is missing on server");
      return new Response(
        JSON.stringify({ error: "Missing GOOGLE_API_KEY on server" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 建立 GoogleGenAI client（在後端用，不會暴露 key）
    const ai = new GoogleGenAI({ apiKey });

    // 用官方 chats.create 介面，history 轉成正確格式
    const chat = ai.chats.create({
      // 模型可以先用最穩定的 2.0 flash，之後要換再改這行即可
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: (Array.isArray(history) ? history : []).map((h) => ({
        role: h.role === "model" ? "model" : "user",
        parts: [{ text: String(h.text ?? "") }],
      })),
    });

    // 送出這次訊息
    const result = await chat.sendMessage({ message });

    // 官方 SDK 會幫你把 response.text 算好
    const text = result?.text ?? "";

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Server chat error:", err);
    return new Response(
      JSON.stringify({
        error: "Server error",
        detail: err?.message ?? String(err),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
