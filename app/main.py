from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import generate, study_plan

app = FastAPI(
    title="QuizCraftQA AI Backend",
    description="Gemini-powered question generation for QuizCraftQA",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate.router)
app.include_router(study_plan.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "QuizCraftQA-AI"}
