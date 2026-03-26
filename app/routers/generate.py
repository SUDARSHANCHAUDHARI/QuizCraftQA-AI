from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini import generate_questions

router = APIRouter()


class GenerateRequest(BaseModel):
    text: str
    question_type: str = "mixed"  # "mcq", "true_false", "fill_blank", "mixed"
    count: int = 5


@router.post("/generate")
async def generate(request: GenerateRequest):
    try:
        questions = await generate_questions(
            text=request.text,
            question_type=request.question_type,
            count=request.count,
        )
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
