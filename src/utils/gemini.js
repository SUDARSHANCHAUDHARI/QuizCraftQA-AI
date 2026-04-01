const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function callGemini(apiKey, prompt) {
  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.error?.message || `API error (${res.status})`;
    if (res.status === 400) throw new Error("Invalid API key or bad request. Check your Gemini API key.");
    if (res.status === 429) throw new Error("Rate limit reached. Wait a moment and try again.");
    throw new Error(msg);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  if (!text) throw new Error("Gemini returned an empty response. Please try again.");
  return text;
}

function extractJson(raw) {
  const cleaned = raw.replace(/^```json\s*|^```\s*|```\s*$/gm, "").trim();
  // Try direct parse first
  try { return JSON.parse(cleaned); } catch {}
  // Try finding first JSON array
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start !== -1 && end !== -1) {
    try { return JSON.parse(cleaned.slice(start, end + 1)); } catch {}
  }
  throw new Error(
    "Could not parse Gemini response as JSON. Try again — the model occasionally returns unexpected formatting."
  );
}

export async function generateQuestions(apiKey, text, questionType, count) {
  const prompt = `You are an ISTQB exam question generator.

Based on the following syllabus text, generate ${count} exam questions of type: ${questionType}.

For each question return a JSON object with:
- "type": "mcq" | "true_false" | "fill_blank"
- "prompt": the question text
- "options": list of 4 options (for mcq only)
- "correctAnswer": the correct answer
- "explanation": brief explanation (1-2 sentences)
- "difficulty": "easy" | "medium" | "hard"

Return a JSON array only, no extra text.

Syllabus text:
${text.slice(0, 3000)}`;

  const raw = await callGemini(apiKey, prompt);
  return extractJson(raw);
}

export async function generateStudyPlan(apiKey, text, weeks, weakTopics) {
  const weakStr = weakTopics.length
    ? `Focus extra on these weak topics: ${weakTopics.join(", ")}.`
    : "";

  const prompt = `You are an ISTQB study coach.

Based on the following syllabus text, create a ${weeks}-week study plan for the ISTQB exam.
${weakStr}

Include:
- Week-by-week topics
- Hours per topic
- Question types to practice
- Final week tips

Syllabus text:
${text.slice(0, 3000)}`;

  return callGemini(apiKey, prompt);
}
