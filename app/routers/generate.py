
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini import generate_questions


logger = logging.getLogger("quizcraftqa-ai.generate")


class GenerateRequest(BaseModel):
    text: str
    question_type: str = "mixed"  # "mcq", "true_false", "fill_blank", "mixed"
    count: int = 5



@router.post("/generate")
async def generate(request: GenerateRequest):
    try:
        logger.info(f"Generating questions: type={request.question_type}, count={request.count}")
        questions = await generate_questions(
            text=request.text,
            question_type=request.question_type,
            count=request.count,
        )
        logger.info(f"Generated {len(questions)} questions")
        return {"questions": questions}
    except Exception as e:
        logger.error(f"Error generating questions: {e}")
        raise HTTPException(status_code=500, detail=str(e))
