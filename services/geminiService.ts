// 前端只負責呼叫自己的後端 API，不直接連到 Google

export const sendMessageToGemini = async (
  message: string,
  history: { role: "user" | "model"; text: string }[]
): Promise<string> => {
  try {
    const resp = await fetch("/api/chats", {
      // 如果你把檔名改成 chat.ts，就改成 "/api/chat"
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.error("API /api/chats error:", err);
      return "連線發生錯誤，請稍後再試。";
    }

    const data = await resp.json();
    return data?.text || "抱歉，我現在無法回答，請稍後再試。";
  } catch (e) {
    console.error("Network error:", e);
    return "連線發生錯誤，請檢查網路設定。";
  }
};
