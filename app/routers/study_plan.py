from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini import generate_study_plan

router = APIRouter()


class StudyPlanRequest(BaseModel):
    text: str
    weeks: int = 4
    weak_topics: list[str] = []


@router.post("/study-plan")
async def study_plan(request: StudyPlanRequest):
    try:
        plan = await generate_study_plan(
            text=request.text,
            weeks=request.weeks,
            weak_topics=request.weak_topics,
        )
        return {"plan": plan}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
