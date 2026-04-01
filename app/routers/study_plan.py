
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini import generate_study_plan


logger = logging.getLogger("quizcraftqa-ai.study_plan")


class StudyPlanRequest(BaseModel):
    text: str
    weeks: int = 4
    weak_topics: list[str] = []



@router.post("/study-plan")
async def study_plan(request: StudyPlanRequest):
    try:
        logger.info(f"Generating study plan: weeks={request.weeks}, weak_topics={request.weak_topics}")
        plan = await generate_study_plan(
            text=request.text,
            weeks=request.weeks,
            weak_topics=request.weak_topics,
        )
        logger.info("Study plan generated successfully")
        return {"plan": plan}
    except Exception as e:
        logger.error(f"Error generating study plan: {e}")
        raise HTTPException(status_code=500, detail=str(e))
