import httpx
import asyncio
from typing import List, Optional, Dict, Any
from app.core.config import settings
from app.schemas.legal import PrecedentSearchResponse, PrecedentDetail, CourtInfo, RecentCase
import json
import re
from datetime import datetime

class LegalService:
    def __init__(self):
        self.indian_kanoon_base_url = "https://api.indiankanoon.org"
        self.api_token = settings.indian_kanoon_api_key
        self.headers = {
            "Authorization": f"Token {self.api_token}",
            "Content-Type": "application/json"
        }

    async def search_precedents(
        self, 
        query: str, 
        court: Optional[str] = None,
        year_from: Optional[int] = None,
        year_to: Optional[int] = None,
        limit: int = 10
    ) -> List[PrecedentSearchResponse]:
        """Search for legal precedents using Indian Kanoon API"""
        try:
            # Build search parameters
            search_params = {
                "q": query,
                "type": "judgment",
                "limit": limit
            }
            
            if court:
                search_params["court"] = court
            if year_from:
                search_params["fromdate"] = f"{year_from}-01-01"
            if year_to:
                search_params["todate"] = f"{year_to}-12-31"

            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.indian_kanoon_base_url}/search/",
                    params=search_params,
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    # Fallback to mock data if API fails
                    return await self._get_mock_precedents(query, limit)
                
                data = response.json()
                precedents = []
                
                for result in data.get("results", []):
                    precedent = PrecedentSearchResponse(
                        id=result.get("docid", ""),
                        title=result.get("title", "Unknown Case"),
                        court=result.get("court", "Unknown Court"),
                        date=result.get("date", ""),
                        citation=result.get("citation", ""),
                        summary=result.get("snippet", "")[:200] + "...",
                        similarity=self._calculate_similarity(query, result.get("snippet", "")),
                        tags=self._extract_tags(result.get("snippet", "")),
                        relevance=self._generate_relevance(query, result.get("snippet", "")),
                        how_it_helps=self._generate_how_it_helps(query, result.get("snippet", ""))
                    )
                    precedents.append(precedent)
                
                return precedents[:limit]
                
        except Exception as e:
            print(f"Error searching precedents: {e}")
            # Return mock data as fallback
            return await self._get_mock_precedents(query, limit)

    async def get_precedent_detail(self, precedent_id: str) -> Optional[PrecedentDetail]:
        """Get detailed information about a specific precedent"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.indian_kanoon_base_url}/doc/{precedent_id}/",
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    return await self._get_mock_precedent_detail(precedent_id)
                
                data = response.json()
                
                return PrecedentDetail(
                    id=precedent_id,
                    title=data.get("title", "Unknown Case"),
                    court=data.get("court", "Unknown Court"),
                    date=data.get("date", ""),
                    citation=data.get("citation", ""),
                    summary=data.get("summary", ""),
                    key_points=self._extract_key_points(data.get("content", "")),
                    full_text=data.get("content", ""),
                    tags=self._extract_tags(data.get("content", "")),
                    similarity=0.95,  # Default for detailed view
                    relevance="This case provides important legal principles relevant to your query.",
                    how_it_helps="You can use this precedent to support your legal arguments.",
                    judges=self._extract_judges(data.get("content", "")),
                    parties=self._extract_parties(data.get("content", "")),
                    citations=self._extract_citations(data.get("content", ""))
                )
                
        except Exception as e:
            print(f"Error fetching precedent detail: {e}")
            return await self._get_mock_precedent_detail(precedent_id)

    async def get_available_courts(self) -> List[CourtInfo]:
        """Get list of available courts"""
        courts = [
            CourtInfo(name="Supreme Court of India", type="Supreme Court", jurisdiction="National", location="New Delhi"),
            CourtInfo(name="Delhi High Court", type="High Court", jurisdiction="Delhi", location="New Delhi"),
            CourtInfo(name="Bombay High Court", type="High Court", jurisdiction="Maharashtra", location="Mumbai"),
            CourtInfo(name="Calcutta High Court", type="High Court", jurisdiction="West Bengal", location="Kolkata"),
            CourtInfo(name="Madras High Court", type="High Court", jurisdiction="Tamil Nadu", location="Chennai"),
            CourtInfo(name="Karnataka High Court", type="High Court", jurisdiction="Karnataka", location="Bangalore"),
            CourtInfo(name="Gujarat High Court", type="High Court", jurisdiction="Gujarat", location="Ahmedabad"),
            CourtInfo(name="Punjab and Haryana High Court", type="High Court", jurisdiction="Punjab, Haryana", location="Chandigarh"),
        ]
        return courts

    async def get_recent_cases(self, limit: int = 10) -> List[RecentCase]:
        """Get recent legal cases"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.indian_kanoon_base_url}/recent/",
                    params={"limit": limit},
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    return await self._get_mock_recent_cases(limit)
                
                data = response.json()
                cases = []
                
                for case in data.get("cases", []):
                    recent_case = RecentCase(
                        id=case.get("docid", ""),
                        title=case.get("title", "Unknown Case"),
                        court=case.get("court", "Unknown Court"),
                        date=case.get("date", ""),
                        citation=case.get("citation", ""),
                        summary=case.get("summary", "")[:150] + "...",
                        tags=self._extract_tags(case.get("summary", ""))
                    )
                    cases.append(recent_case)
                
                return cases[:limit]
                
        except Exception as e:
            print(f"Error fetching recent cases: {e}")
            return await self._get_mock_recent_cases(limit)

    def _calculate_similarity(self, query: str, text: str) -> float:
        """Calculate similarity between query and text"""
        query_words = set(query.lower().split())
        text_words = set(text.lower().split())
        
        if not query_words or not text_words:
            return 0.0
        
        intersection = query_words.intersection(text_words)
        union = query_words.union(text_words)
        
        return len(intersection) / len(union) if union else 0.0

    def _extract_tags(self, text: str) -> List[str]:
        """Extract legal tags from text"""
        legal_terms = [
            "Constitutional Law", "Criminal Law", "Civil Law", "Family Law",
            "Property Law", "Contract Law", "Tort Law", "Administrative Law",
            "Tax Law", "Labor Law", "Environmental Law", "Intellectual Property",
            "Human Rights", "Judicial Review", "Fundamental Rights"
        ]
        
        found_tags = []
        text_lower = text.lower()
        
        for term in legal_terms:
            if term.lower() in text_lower:
                found_tags.append(term)
        
        return found_tags[:5]  # Limit to 5 tags

    def _generate_relevance(self, query: str, text: str) -> str:
        """Generate relevance description"""
        return f"This case is relevant to your query about '{query}' as it addresses similar legal principles and issues."

    def _generate_how_it_helps(self, query: str, text: str) -> str:
        """Generate how the case helps"""
        return f"You can use this precedent to strengthen your legal arguments related to '{query}' and establish similar legal principles."

    def _extract_key_points(self, text: str) -> List[str]:
        """Extract key legal points from text"""
        # Simple extraction - in production, use NLP
        sentences = text.split('.')
        key_points = []
        
        for sentence in sentences[:10]:  # First 10 sentences
            if any(keyword in sentence.lower() for keyword in ['held', 'ruled', 'decided', 'established', 'principle']):
                key_points.append(sentence.strip())
        
        return key_points[:5]  # Limit to 5 key points

    def _extract_judges(self, text: str) -> List[str]:
        """Extract judge names from text"""
        # Simple extraction - in production, use NER
        judge_pattern = r'(?:Hon\'ble|Honorable)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)'
        judges = re.findall(judge_pattern, text)
        return list(set(judges))[:3]  # Limit to 3 judges

    def _extract_parties(self, text: str) -> Dict[str, str]:
        """Extract party information"""
        # Simple extraction
        return {
            "petitioner": "Petitioner",
            "respondent": "Respondent"
        }

    def _extract_citations(self, text: str) -> List[str]:
        """Extract legal citations"""
        citation_pattern = r'[A-Z]{2,}\s+\d{4}\s+[A-Z]{2,}\s+\d+'
        citations = re.findall(citation_pattern, text)
        return list(set(citations))[:5]  # Limit to 5 citations

    async def _get_mock_precedents(self, query: str, limit: int) -> List[PrecedentSearchResponse]:
        """Fallback mock data"""
        return [
            PrecedentSearchResponse(
                id="1",
                title="Kesavananda Bharati v. State of Kerala",
                court="Supreme Court of India",
                date="1973-04-24",
                citation="AIR 1973 SC 1461",
                summary="Landmark case establishing the basic structure doctrine of the Indian Constitution.",
                similarity=0.95,
                tags=["Constitutional Law", "Basic Structure", "Judicial Review"],
                relevance="This case is highly relevant as it establishes fundamental principles about constitutional limitations.",
                how_it_helps="You can use this precedent to argue that certain constitutional amendments may be subject to judicial review."
            )
        ]

    async def _get_mock_precedent_detail(self, precedent_id: str) -> PrecedentDetail:
        """Fallback mock data for precedent detail"""
        return PrecedentDetail(
            id=precedent_id,
            title="Kesavananda Bharati v. State of Kerala",
            court="Supreme Court of India",
            date="1973-04-24",
            citation="AIR 1973 SC 1461",
            summary="Landmark case establishing the basic structure doctrine of the Indian Constitution.",
            key_points=[
                "Basic structure doctrine established",
                "Limits on parliamentary power to amend Constitution",
                "Judicial review of constitutional amendments"
            ],
            full_text="Full judgment text would be here...",
            tags=["Constitutional Law", "Basic Structure", "Judicial Review"],
            similarity=0.95,
            relevance="This case is highly relevant as it establishes fundamental principles about constitutional limitations.",
            how_it_helps="You can use this precedent to argue that certain constitutional amendments may be subject to judicial review.",
            judges=["Chief Justice Sikri"],
            parties={"petitioner": "Kesavananda Bharati", "respondent": "State of Kerala"},
            citations=["AIR 1973 SC 1461"]
        )

    async def _get_mock_recent_cases(self, limit: int) -> List[RecentCase]:
        """Fallback mock data for recent cases"""
        return [
            RecentCase(
                id="1",
                title="Recent Constitutional Case",
                court="Supreme Court of India",
                date="2024-01-15",
                citation="2024 SCC 1",
                summary="A recent case addressing constitutional issues.",
                tags=["Constitutional Law", "Recent"]
            )
        ]
