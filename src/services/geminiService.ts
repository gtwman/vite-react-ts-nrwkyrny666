import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getEnvApiKey = (): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    console.warn("無法讀取環境變數:", e);
  }
  return "";
};

const GOOGLE_API_KEY = getEnvApiKey();
const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY || 'dummy-key' });

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

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY.length < 10) {
    return "⚠️ 系統設定錯誤：找不到 API Key。\n請確認 .env 檔案內容是否為 VITE_API_KEY=您的Key";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "抱歉，我現在無法回答，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線發生錯誤，請檢查網路或 API Key 設定。";
  }
};