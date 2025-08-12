from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.user import User as UserModel
from app.api.auth import get_current_user
from app.schemas.legal import (
    PrecedentSearchRequest, 
    PrecedentSearchResponse, 
    PrecedentDetail,
    ChatMessage,
    ChatResponse,
    DocumentAnalysisRequest,
    DocumentAnalysisResponse
)
from app.services.legal_service import LegalService
from app.services.ai_service import AIService
import json

router = APIRouter(prefix="/api/legal", tags=["legal"])

@router.post("/search-precedents", response_model=List[PrecedentSearchResponse])
async def search_precedents(
    request: PrecedentSearchRequest,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Search for legal precedents based on case description"""
    try:
        legal_service = LegalService()
        precedents = await legal_service.search_precedents(
            query=request.query,
            court=request.court,
            year_from=request.year_from,
            year_to=request.year_to,
            limit=request.limit or 10
        )
        return precedents
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching precedents: {str(e)}")

@router.get("/precedent/{precedent_id}", response_model=PrecedentDetail)
async def get_precedent_detail(
    precedent_id: str,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get detailed information about a specific precedent"""
    try:
        legal_service = LegalService()
        precedent = await legal_service.get_precedent_detail(precedent_id)
        if not precedent:
            raise HTTPException(status_code=404, detail="Precedent not found")
        return precedent
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching precedent: {str(e)}")

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(
    message: ChatMessage,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Chat with AI legal assistant"""
    try:
        ai_service = AIService()
        response = await ai_service.chat_with_legal_assistant(
            user_message=message.content,
            user_id=current_user.id,
            context=message.context
        )
        return ChatResponse(
            message=response,
            timestamp=message.timestamp
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in AI chat: {str(e)}")

@router.post("/analyze-document", response_model=DocumentAnalysisResponse)
async def analyze_document(
    file: UploadFile = File(...),
    analysis_type: str = Form("summary"),  # summary, key_points, legal_issues
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Analyze uploaded legal document"""
    try:
        if not file.filename.endswith(('.pdf', '.docx', '.txt')):
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
        ai_service = AIService()
        analysis = await ai_service.analyze_document(
            file=file,
            analysis_type=analysis_type,
            user_id=current_user.id
        )
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing document: {str(e)}")

@router.get("/courts")
async def get_available_courts(
    current_user: UserModel = Depends(get_current_user)
):
    """Get list of available courts"""
    try:
        legal_service = LegalService()
        courts = await legal_service.get_available_courts()
        return {"courts": courts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching courts: {str(e)}")

@router.get("/recent-cases")
async def get_recent_cases(
    limit: int = 10,
    current_user: UserModel = Depends(get_current_user)
):
    """Get recent legal cases"""
    try:
        legal_service = LegalService()
        cases = await legal_service.get_recent_cases(limit=limit)
        return {"cases": cases}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching recent cases: {str(e)}")
