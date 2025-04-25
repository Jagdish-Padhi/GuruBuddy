// utils/groqUtil.js
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqSummarize(text) {  // Make sure to use `export` here
  const response = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful summarizer. Summarize the lecture briefly and clearly.' },
      { role: 'user', content: text }
    ],
    model: 'llama3-8b-8192'
  });

  return response.choices[0]?.message?.content?.trim();
}
