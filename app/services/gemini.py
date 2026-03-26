import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel(os.getenv("GEMINI_MODEL", "gemini-1.5-flash"))


async def generate_questions(text: str, question_type: str, count: int) -> list:
    prompt = f"""
You are an ISTQB exam question generator.

Based on the following syllabus text, generate {count} exam questions of type: {question_type}.

For each question return a JSON object with:
- "type": "mcq" | "true_false" | "fill_blank"
- "prompt": the question text
- "options": list of 4 options (for mcq only)
- "correctAnswer": the correct answer
- "explanation": brief explanation (1-2 sentences)
- "difficulty": "easy" | "medium" | "hard"

Return a JSON array only, no extra text.

Syllabus text:
{text[:3000]}
"""
    response = model.generate_content(prompt)
    import json, re
    raw = response.text.strip()
    raw = re.sub(r"^```json|^```|```$", "", raw, flags=re.MULTILINE).strip()
    return json.loads(raw)


async def generate_study_plan(text: str, weeks: int, weak_topics: list) -> str:
    weak = f"Focus extra on these weak topics: {', '.join(weak_topics)}." if weak_topics else ""
    prompt = f"""
You are an ISTQB study coach.

Based on the following syllabus text, create a {weeks}-week study plan for the ISTQB exam.
{weak}

Include:
- Week-by-week topics
- Hours per topic
- Question types to practice
- Final week tips

Syllabus text:
{text[:3000]}
"""
    response = model.generate_content(prompt)
    return response.text
