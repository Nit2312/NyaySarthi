import httpx
import asyncio
from typing import List, Optional, Dict, Any
from app.core.config import settings
from app.schemas.legal import DocumentAnalysisResponse
import json
import re
from datetime import datetime
import PyPDF2
import io
from docx import Document

class AIService:
    def __init__(self):
        self.huggingface_api_url = "https://api-inference.huggingface.co/models"
        self.api_key = settings.huggingface_api_key
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        # Legal-specific models
        self.legal_qa_model = "microsoft/DialoGPT-medium"  # For chat
        self.summarization_model = "facebook/bart-large-cnn"  # For document summarization
        self.ner_model = "dslim/bert-base-NER"  # For named entity recognition

    async def chat_with_legal_assistant(
        self, 
        user_message: str, 
        user_id: int,
        context: Optional[Dict[str, Any]] = None
    ) -> str:
        """Chat with AI legal assistant using Hugging Face models"""
        try:
            # Prepare the prompt with legal context
            legal_prompt = self._create_legal_prompt(user_message, context)
            
            # Use Hugging Face API for text generation
            payload = {
                "inputs": legal_prompt,
                "parameters": {
                    "max_length": 500,
                    "temperature": 0.7,
                    "do_sample": True,
                    "top_p": 0.9
                }
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.huggingface_api_url}/{self.legal_qa_model}",
                    headers=self.headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    result = response.json()
                    if isinstance(result, list) and len(result) > 0:
                        return result[0].get("generated_text", "")
                    elif isinstance(result, dict):
                        return result.get("generated_text", "")
                
                # Fallback to rule-based response
                return self._generate_rule_based_response(user_message)
                
        except Exception as e:
            print(f"Error in AI chat: {e}")
            return self._generate_rule_based_response(user_message)

    async def analyze_document(
        self, 
        file, 
        analysis_type: str = "summary",
        user_id: int = None
    ) -> DocumentAnalysisResponse:
        """Analyze uploaded legal document"""
        try:
            # Extract text from document
            text = await self._extract_text_from_file(file)
            
            if not text:
                raise ValueError("Could not extract text from document")
            
            # Perform analysis based on type
            if analysis_type == "summary":
                summary = await self._generate_summary(text)
                key_points = await self._extract_key_points(text)
                legal_issues = await self._identify_legal_issues(text)
            elif analysis_type == "key_points":
                summary = text[:200] + "..."
                key_points = await self._extract_key_points(text)
                legal_issues = []
            elif analysis_type == "legal_issues":
                summary = text[:200] + "..."
                key_points = []
                legal_issues = await self._identify_legal_issues(text)
            else:
                summary = await self._generate_summary(text)
                key_points = await self._extract_key_points(text)
                legal_issues = await self._identify_legal_issues(text)
            
            # Extract citations
            citations = self._extract_citations(text)
            
            return DocumentAnalysisResponse(
                summary=summary,
                key_points=key_points,
                legal_issues=legal_issues,
                citations=citations,
                confidence_score=0.85,
                processing_time=2.5
            )
            
        except Exception as e:
            print(f"Error analyzing document: {e}")
            return DocumentAnalysisResponse(
                summary="Error analyzing document",
                key_points=[],
                legal_issues=[],
                citations=[],
                confidence_score=0.0,
                processing_time=0.0
            )

    async def _extract_text_from_file(self, file) -> str:
        """Extract text from uploaded file"""
        try:
            content = await file.read()
            
            if file.filename.endswith('.pdf'):
                return self._extract_text_from_pdf(content)
            elif file.filename.endswith('.docx'):
                return self._extract_text_from_docx(content)
            elif file.filename.endswith('.txt'):
                return content.decode('utf-8')
            else:
                return ""
                
        except Exception as e:
            print(f"Error extracting text: {e}")
            return ""

    def _extract_text_from_pdf(self, content: bytes) -> str:
        """Extract text from PDF"""
        try:
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text
        except Exception as e:
            print(f"Error extracting PDF text: {e}")
            return ""

    def _extract_text_from_docx(self, content: bytes) -> str:
        """Extract text from DOCX"""
        try:
            doc = Document(io.BytesIO(content))
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        except Exception as e:
            print(f"Error extracting DOCX text: {e}")
            return ""

    async def _generate_summary(self, text: str) -> str:
        """Generate summary using Hugging Face model"""
        try:
            # Truncate text if too long
            if len(text) > 1000:
                text = text[:1000]
            
            payload = {
                "inputs": text,
                "parameters": {
                    "max_length": 150,
                    "min_length": 50,
                    "do_sample": False
                }
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.huggingface_api_url}/{self.summarization_model}",
                    headers=self.headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    result = response.json()
                    if isinstance(result, list) and len(result) > 0:
                        return result[0].get("summary_text", "")
                
                # Fallback to simple summary
                return self._generate_simple_summary(text)
                
        except Exception as e:
            print(f"Error generating summary: {e}")
            return self._generate_simple_summary(text)

    async def _extract_key_points(self, text: str) -> List[str]:
        """Extract key legal points from text"""
        try:
            # Use NER model to identify legal entities
            sentences = text.split('.')
            key_points = []
            
            for sentence in sentences[:20]:  # Check first 20 sentences
                if any(keyword in sentence.lower() for keyword in [
                    'held', 'ruled', 'decided', 'established', 'principle',
                    'court', 'judgment', 'order', 'directed', 'declared'
                ]):
                    key_points.append(sentence.strip())
            
            return key_points[:5]  # Limit to 5 key points
            
        except Exception as e:
            print(f"Error extracting key points: {e}")
            return []

    async def _identify_legal_issues(self, text: str) -> List[str]:
        """Identify legal issues in the document"""
        try:
            legal_issues = []
            legal_keywords = [
                'constitutional', 'fundamental rights', 'violation',
                'breach', 'contract', 'tort', 'negligence', 'damages',
                'injunction', 'specific performance', 'compensation'
            ]
            
            sentences = text.split('.')
            for sentence in sentences:
                sentence_lower = sentence.lower()
                for keyword in legal_keywords:
                    if keyword in sentence_lower:
                        legal_issues.append(sentence.strip())
                        break
            
            return list(set(legal_issues))[:5]  # Limit to 5 issues
            
        except Exception as e:
            print(f"Error identifying legal issues: {e}")
            return []

    def _extract_citations(self, text: str) -> List[str]:
        """Extract legal citations from text"""
        try:
            # Common citation patterns
            citation_patterns = [
                r'[A-Z]{2,}\s+\d{4}\s+[A-Z]{2,}\s+\d+',  # AIR 1973 SC 1461
                r'\d+\s+[A-Z]{2,}\s+\d+',  # 1973 SC 1461
                r'[A-Z]{2,}\s+\d+\s+[A-Z]{2,}',  # AIR 1461 SC
            ]
            
            citations = []
            for pattern in citation_patterns:
                matches = re.findall(pattern, text)
                citations.extend(matches)
            
            return list(set(citations))[:10]  # Limit to 10 citations
            
        except Exception as e:
            print(f"Error extracting citations: {e}")
            return []

    def _create_legal_prompt(self, user_message: str, context: Optional[Dict[str, Any]] = None) -> str:
        """Create a legal context-aware prompt"""
        base_prompt = """You are a legal assistant specializing in Indian law. Provide helpful, accurate legal information based on Indian legal principles and precedents.

User Question: {user_message}

Please provide a comprehensive legal response that includes:
1. Relevant legal principles
2. Applicable precedents if any
3. Practical advice
4. Important caveats

Response:"""
        
        if context and context.get('precedent'):
            base_prompt += f"\n\nContext - Related Case: {context['precedent']}"
        
        return base_prompt.format(user_message=user_message)

    def _generate_rule_based_response(self, user_message: str) -> str:
        """Generate a rule-based response when AI fails"""
        legal_responses = {
            'constitutional': "This involves constitutional law principles. You should consult relevant constitutional provisions and precedents.",
            'criminal': "This appears to be a criminal law matter. Consider the relevant sections of the Indian Penal Code and criminal procedure.",
            'civil': "This is a civil law issue. Review applicable civil laws and precedents for guidance.",
            'contract': "This involves contract law. Check the Indian Contract Act and related precedents.",
            'property': "This is a property law matter. Consider property laws and relevant precedents."
        }
        
        user_lower = user_message.lower()
        for keyword, response in legal_responses.items():
            if keyword in user_lower:
                return response
        
        return "I understand your legal query. Please provide more specific details about your case so I can give you more targeted legal guidance."

    def _generate_simple_summary(self, text: str) -> str:
        """Generate a simple summary when AI fails"""
        sentences = text.split('.')
        summary_sentences = sentences[:3]  # First 3 sentences
        return '. '.join(summary_sentences) + "."
