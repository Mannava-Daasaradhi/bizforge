# backend/main.py
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import models
import ai_services  # We will build this next

app = FastAPI(title="BizForge AI Backend")

# Enable CORS so the Vercel frontend can make requests to this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace "*" with your Vercel domain
    allow_credentials=True,
    allow_methods=["POST"], # Enforcing POST-only endpoints as requested
    allow_headers=["*"],
)

@app.post("/api/generate-brand")
async def generate_brand(req: models.BrandNameRequest):
    return await ai_services.generate_brand_names(req)

@app.post("/api/generate-logo")
async def generate_logo(req: models.LogoRequest):
    return await ai_services.generate_logo_image(req)

@app.post("/api/generate-content")
async def generate_content(req: models.ContentRequest):
    return await ai_services.generate_marketing_content(req)

@app.post("/api/get-colors")
async def get_colors(req: models.ColorRequest):
    return await ai_services.generate_design_system(req)

@app.post("/api/analyze-sentiment")
async def analyze_sentiment(req: models.SentimentRequest):
    return await ai_services.analyze_sentiment(req)

@app.post("/api/chat")
async def chat(req: models.ChatRequest):
    return await ai_services.ibm_granite_chat(req)

@app.post("/api/generate-tagline")
async def generate_tagline(req: models.TaglineRequest):
    return await ai_services.generate_taglines(req)

@app.post("/api/generate-brand-story")
async def generate_brand_story(req: models.BrandStoryRequest):
    return await ai_services.generate_brand_story(req)

@app.post("/api/generate-social")
async def generate_social(req: models.SocialRequest):
    return await ai_services.generate_social_post(req)

@app.post("/api/generate-email")
async def generate_email(req: models.EmailRequest):
    return await ai_services.generate_email_template(req)

@app.post("/api/generate-product")
async def generate_product(req: models.ProductRequest):
    return await ai_services.generate_product_description(req)

@app.post("/api/generate-mission")
async def generate_mission(req: models.MissionRequest):
    return await ai_services.generate_mission_vision(req)

@app.post("/api/generate-persona")
async def generate_persona(req: models.PersonaRequest):
    return await ai_services.generate_personas(req)

@app.post("/api/generate-ad")
async def generate_ad(req: models.AdRequest):
    return await ai_services.generate_ad_copy(req)

@app.post("/api/generate-hashtags")
async def generate_hashtags(req: models.HashtagRequest):
    return await ai_services.generate_hashtags(req)

@app.post("/api/generate-press-release")
async def generate_press_release(req: models.PressReleaseRequest):
    return await ai_services.generate_press_release(req)

@app.post("/api/generate-seo")
async def generate_seo(req: models.SEORequest):
    return await ai_services.generate_seo_meta(req)

@app.post("/api/generate-faq")
async def generate_faq(req: models.FAQRequest):
    return await ai_services.generate_faqs(req)

@app.post("/api/generate-pitch")
async def generate_pitch(req: models.PitchRequest):
    return await ai_services.generate_pitch(req)

@app.post("/api/summarize")
async def summarize(req: models.SummarizeRequest):
    return await ai_services.summarize_text(req)

@app.post("/api/transcribe-voice")
async def transcribe_voice(file: UploadFile = File(...)):
    # Handled via file upload rather than standard JSON model
    return await ai_services.transcribe_audio(file)

@app.post("/api/check-consistency")
async def check_consistency(req: models.ConsistencyRequest):
    return await ai_services.check_brand_consistency(req)

@app.post("/api/generate-bizcard")
async def generate_bizcard(req: models.BizCardRequest):
    return await ai_services.generate_business_card(req)

@app.post("/api/check-availability")
async def check_availability(req: models.AvailabilityRequest):
    return await ai_services.check_domain_availability(req)