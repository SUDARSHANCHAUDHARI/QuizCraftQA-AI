# QuizCraftQA-AI

Gemini API backend for [QuizCraftQA](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA) — generates high-quality ISTQB exam questions from PDF text using Google Gemini.

## Features

- Generate Multiple Choice, True/False, and Fill-in-the-Blank questions
- Bloom's taxonomy difficulty scoring
- Detailed explanations for each answer
- REST API compatible with QuizCraftQA's `VITE_AI_STUDY_ENDPOINT`

## Tech Stack

- Python 3.11+
- FastAPI
- Google Gemini API (`google-generativeai`)

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI.git
cd QuizCraftQA-AI
```

### 2. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

```bash
cp .env.example .env
# Add your Gemini API key to .env
```

### 5. Run the server

```bash
uvicorn app.main:app --reload
```

API will be available at `http://localhost:8000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/generate` | Generate questions from PDF text |
| POST | `/study-plan` | Generate a personalised study plan |

## Connecting to QuizCraftQA

In your QuizCraftQA `.env`:

```
VITE_AI_STUDY_ENDPOINT=http://localhost:8000/generate
VITE_AI_VARIANT_ENDPOINT=http://localhost:8000/generate
```

## Related Projects

- [QuizCraftQA](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA) — Main web app
- [QuizCraftQA-NotebookLM](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-NotebookLM) — Manual NotebookLM workflow
