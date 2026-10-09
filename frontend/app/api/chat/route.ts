import { NextResponse } from 'next/server';

const tools = [
  {
    functionDeclarations: [
      {
        name: "calculate_expression",
        description: "Do maths calculation",
        parameters: {
          type: "OBJECT",
          properties: { expression: { type: "STRING" } },
          required: ["expression"]
        }
      }
    ]
  }
];

async function callGemini(message: string, key: string) {
  const MODEL = "gemini-2.5-flash";

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: message }] }],
        tools: tools
      })
    }
  );

  const data = await res.json();
  if (data.error) return `Gemini Error: ${data.error.message} da`;
  
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "No reply da";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ reply: "API Key missing da!" });
    const txt = await callGemini(message, key);
    return NextResponse.json({ reply: txt });
  } catch (e: any) {
    return NextResponse.json({ reply: `Error da: ${e.message}` });
  }
}