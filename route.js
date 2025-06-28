import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    console.log("Received messages:", messages);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      //messages: messages,
       messages: [
    { role: "system", content: "You are a helpful AI tutor." },
    { role: "user", content: "What is photosynthesis?" }
  ],
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[CHATBOT API ERROR]", error.message);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

