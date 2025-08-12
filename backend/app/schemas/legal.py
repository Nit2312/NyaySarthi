from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class PrecedentSearchRequest(BaseModel):
    query: str
    court: Optional[str] = None
    year_from: Optional[int] = None
    year_to: Optional[int] = None
    limit: Optional[int] = 10

class PrecedentSearchResponse(BaseModel):
    id: str
    title: str
    court: str
    date: str
    citation: str
    summary: str
    similarity: float
    tags: List[str]
    relevance: str
    how_it_helps: str

class PrecedentDetail(BaseModel):
    id: str
    title: str
    court: str
    date: str
    citation: str
    summary: str
    key_points: List[str]
    full_text: str
    tags: List[str]
    similarity: float
    relevance: str
    how_it_helps: str
    judges: List[str]
    parties: Dict[str, str]
    citations: List[str]

class ChatMessage(BaseModel):
    content: str
    context: Optional[Dict[str, Any]] = None
    timestamp: datetime = datetime.now()

class ChatResponse(BaseModel):
    message: str
    timestamp: datetime
    sources: Optional[List[str]] = None

class DocumentAnalysisRequest(BaseModel):
    analysis_type: str = "summary"  # summary, key_points, legal_issues
    include_citations: bool = True

class DocumentAnalysisResponse(BaseModel):
    summary: str
    key_points: List[str]
    legal_issues: List[str]
    citations: List[str]
    confidence_score: float
    processing_time: float

class CourtInfo(BaseModel):
    name: str
    type: str
    jurisdiction: str
    location: str

class RecentCase(BaseModel):
    id: str
    title: str
    court: str
    date: str
    citation: str
    summary: str
    tags: List[str]
