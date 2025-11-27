// api/chats.ts － Vercel Edge Function，跑在後端
export const config = {
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
      body = (await req.json()) ?? {};
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

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_API_KEY is missing on server");
      return new Response(
        JSON.stringify({ error: "Missing GOOGLE_API_KEY on server" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 把歷史訊息轉成 Gemini 需要的 contents
    const contents = [
      ...(Array.isArray(history) ? history : []).map((h) => ({
        role: h.role === "model" ? "model" : "user",
        parts: [{ text: String(h.text ?? "") }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const payload = {
      contents,
      systemInstruction: {
        // systemInstruction 也是 Content 型別，這裡只放文字就好
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
    };

    // 官方推薦的 endpoint ＋ 在 query string 帶 key
    const url =
      "https://generativelanguage.googleapis.com/" +
      "v1beta/models/gemini-2.0-flash:generateContent" +
      `?key=${encodeURIComponent(apiKey)}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Gemini API error:", resp.status, errText);
      return new Response(
        JSON.stringify({
          error: "Gemini API error",
          status: resp.status,
          detail: errText,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await resp.json();

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .filter(Boolean)
        .join("\n") ?? "";

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Server chat error:", err);
    return new Response(
      JSON.stringify({
        error: err?.message || "Server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
