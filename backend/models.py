# backend/models.py
from pydantic import BaseModel
from typing import List, Optional

class BrandNameRequest(BaseModel):
    keywords: str
    industry: str
    tone: str

class LogoRequest(BaseModel):
    brand_name: str
    industry: str
    keywords: str
    style_preference: str

class ContentRequest(BaseModel):
    brand_description: str
    tone: str
    content_type: str

class ColorRequest(BaseModel):
    brand_tone: str
    industry: str

class SentimentRequest(BaseModel):
    review_text: str
    brand_tone_reference: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class TaglineRequest(BaseModel):
    brand_name: str
    industry: str
    core_value: str
    tone: str

class BrandStoryRequest(BaseModel):
    founder_name: Optional[str] = None
    business_type: str
    mission: str
    target_audience: str
    year_founded: str

class SocialRequest(BaseModel):
    brand_description: str
    platform: str
    topic: str
    tone: str

class EmailRequest(BaseModel):
    email_type: str
    brand_name: str
    key_message: str
    tone: str

class ProductRequest(BaseModel):
    product_name: str
    key_features: str
    target_customer: str
    tone: str

class MissionRequest(BaseModel):
    industry: str
    core_values: str
    target_audience: str
    impact_goal: str

class PersonaRequest(BaseModel):
    product_type: str
    industry: str
    price_range: str
    geography: str

class AdRequest(BaseModel):
    product_service: str
    usp: str
    target_audience: str
    platform: str

class HashtagRequest(BaseModel):
    brand_niche: str
    post_topic: str
    platform: str
    tone: str

class PressReleaseRequest(BaseModel):
    announcement_type: str
    brand_name: str
    key_details: str
    founder_quote: str

class SEORequest(BaseModel):
    page_topic: str
    target_keyword: str
    brand_name: str
    tone: str

class FAQRequest(BaseModel):
    business_type: str
    product_description: str
    target_audience: str

class PitchRequest(BaseModel):
    business_name: str
    problem_solved: str
    solution: str
    target_market: str
    revenue_model: str
    traction: Optional[str] = None

class SummarizeRequest(BaseModel):
    document_text: str

class ConsistencyRequest(BaseModel):
    content_pieces: List[str]

class BizCardRequest(BaseModel):
    name: str
    role: str
    brand_name: str
    contact_info: str
    tagline_preference: str

class AvailabilityRequest(BaseModel):
    brand_name: str