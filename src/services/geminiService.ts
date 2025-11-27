// src/services/geminiService.ts  （前端只呼叫自己的後端 API）

export const sendMessageToGemini = async (
  message: string,
  history: { role: "user" | "model"; text: string }[]
): Promise<string> => {
  try {
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.error("API /api/chat error:", err);
      return "連線發生錯誤，請稍後再試。";
    }

    const data = await resp.json();
    return data?.text || "抱歉，我現在無法回答，請稍後再試。";
  } catch (e) {
    console.error("Network error:", e);
    return "連線發生錯誤，請檢查網路設定。";
  }
};
