
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routers import generate, study_plan


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("quizcraftqa-ai")

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


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response: {response.status_code} {request.method} {request.url}")
    return response

app.include_router(generate.router)
app.include_router(study_plan.router)



@app.get("/")
def health_check():
    logger.info("Health check endpoint called")
    return {"status": "ok", "service": "QuizCraftQA-AI"}
