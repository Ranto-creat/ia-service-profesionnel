// pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Erreur OpenAI :", error);
    res.status(500).json({ error: "Erreur lors de l'appel à OpenAI" });
  }
}
