# QuizCraftQA-AI — Claude Code Notes

## What is this project?
Python/FastAPI backend that uses Google Gemini API to generate high-quality ISTQB exam questions from PDF text. Acts as the AI backend for QuizCraftQA.

## Tech Stack
- Python 3.11+
- FastAPI
- Google Gemini API (`google-generativeai`)
- Uvicorn (ASGI server)
- Pydantic for request validation

## Key Files
- `app/main.py` — FastAPI app, CORS, router registration
- `app/routers/generate.py` — POST /generate endpoint
- `app/routers/study_plan.py` — POST /study-plan endpoint
- `app/services/gemini.py` — Gemini API calls, prompt logic
- `.env` — API key config (never commit this)
- `.env.example` — template for .env

## Commands
```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload   # starts at http://localhost:8000
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/generate` | Generate questions from PDF text |
| POST | `/study-plan` | Generate personalised study plan |

## Environment Variables
```
GEMINI_API_KEY=your_key_here      # get free key at aistudio.google.com
GEMINI_MODEL=gemini-1.5-flash     # free tier model
```

## Connecting to QuizCraftQA
In QuizCraftQA `.env`:
```
VITE_AI_STUDY_ENDPOINT=http://localhost:8000/generate
VITE_AI_VARIANT_ENDPOINT=http://localhost:8000/generate
```

## Note on google-generativeai
The `google.generativeai` package is deprecated. Future migration needed to `google.genai` package.

## Related Projects
- [QuizCraftQA](../QuizCraftQA) — Main web app
- [QuizCraftQA-NotebookLM](../QuizCraftQA-NotebookLM) — Manual NotebookLM workflow
