# backend/ai_services.py
import os
import time
import requests
from fastapi import HTTPException
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
HF_API_KEY = os.getenv("HF_API_KEY")

if not GROQ_API_KEY or not HF_API_KEY:
    print("WARNING: API keys missing from .env file!")

# Initialize Groq Client
groq_client = Groq(api_key=GROQ_API_KEY)

# ==========================================
# HELPER FUNCTIONS
# ==========================================
async def call_groq(prompt: str, system_prompt: str = "You are an expert branding and marketing AI assistant.") -> str:
    """Helper function to call Groq LLaMA-3.3-70B"""
    try:
        completion = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            top_p=0.95,
        )
        return completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API Error: {str(e)}")

async def call_sdxl(prompt: str) -> bytes:
    """Helper function to call HuggingFace SDXL via Inference API"""
    API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    try:
        response = requests.post(API_URL, headers=headers, json={"inputs": prompt})
        response.raise_for_status()
        return response.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SDXL Image Generation Error: {str(e)}")

# ==========================================
# TOOL ENDPOINTS (1 to 24)
# ==========================================

async def generate_brand_names(req):
    prompt = f"Generate 10-20 highly creative brand names for a business in the {req.industry} industry. The keywords are: {req.keywords}. The tone should be {req.tone}. Include a punchy one-line tagline for each name. Format as a clean list."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_logo_image(req):
    # 1. Use Groq to craft the perfect SDXL prompt
    prompt_builder = f"Write a highly descriptive, comma-separated image generation prompt for Stable Diffusion XL to create a logo. Brand name: {req.brand_name}, Industry: {req.industry}, Keywords: {req.keywords}, Style: {req.style_preference}. Only output the prompt, nothing else. Make it highly professional, clean white background, vector style."
    sdxl_prompt = await call_groq(prompt_builder)
    
    # 2. Call SDXL
    image_bytes = await call_sdxl(sdxl_prompt)
    
    # 3. Save to disk (for local/cloud temporary storage)
    save_dir = "../frontend/static/generated_logos"
    os.makedirs(save_dir, exist_ok=True)
    filename = f"logo_{int(time.time())}.png"
    filepath = os.path.join(save_dir, filename)
    
    with open(filepath, "wb") as f:
        f.write(image_bytes)
        
    return {
        "image_url": f"/static/generated_logos/{filename}",
        "prompt_used": sdxl_prompt
    }

async def generate_marketing_content(req):
    prompt = f"Write {req.content_type} for a brand described as: {req.brand_description}. The tone must be exactly {req.tone}. Make it polished and ready for publication."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_design_system(req):
    prompt = f"Create a design system for a {req.tone} brand in the {req.industry} industry. Output exactly: 1. 3-5 HEX color codes. 2. A primary and secondary font pairing recommendation. 3. A CSS variables snippet with the colors."
    result = await call_groq(prompt)
    return {"result": result}

async def analyze_sentiment(req):
    prompt = f"Analyze this customer review: '{req.review_text}'. The brand's tone is {req.brand_tone_reference}. 1. Classify sentiment (Positive/Neutral/Negative). 2. Give a confidence score. 3. Break down the emotional tone. 4. Rewrite the review into a highly professional testimonial aligning with the brand tone."
    result = await call_groq(prompt)
    return {"result": result}

async def ibm_granite_chat(req):
    # Constructing a chat history for Groq to handle the Chatbot tab efficiently in the cloud
    messages = [{"role": "system", "content": "You are BizForge AI, an expert branding assistant."}]
    
    for msg in req.history:
        messages.append({"role": msg.role, "content": msg.content})
        
    messages.append({"role": "user", "content": req.message})

    try:
        completion = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.7,
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat API Error: {str(e)}")

async def generate_taglines(req):
    prompt = f"Create 5-10 punchy taglines/slogans for '{req.brand_name}' in the {req.industry} industry. Core value: {req.core_value}. Tone: {req.tone}. Add a bracketed emotional label next to each (e.g., [Inspiring])."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_brand_story(req):
    founder_str = f"Founder: {req.founder_name}." if req.founder_name else ""
    prompt = f"Write a compelling 1-2 paragraph brand origin story. Business: {req.business_type}. Mission: {req.mission}. Audience: {req.target_audience}. Founded: {req.year_founded}. {founder_str} Make it emotionally resonant."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_social_post(req):
    prompt = f"Write a {req.platform} post about {req.topic} for this brand: {req.brand_description}. Tone: {req.tone}. Optimize for {req.platform}, include appropriate emojis, and put 5-8 relevant hashtags at the bottom."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_email_template(req):
    prompt = f"Write a {req.email_type} email for '{req.brand_name}'. Key message: {req.key_message}. Tone: {req.tone}. Include a catchy Subject Line separated clearly at the top, body copy, and a clear Call to Action."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_product_description(req):
    prompt = f"Product: {req.product_name}. Features: {req.key_features}. Target: {req.target_customer}. Tone: {req.tone}. Output exactly three sections: 1. Short description (max 50 words). 2. Long description (~150 words). 3. Bullet-point highlights."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_mission_vision(req):
    prompt = f"Industry: {req.industry}. Values: {req.core_values}. Audience: {req.target_audience}. Goal: {req.impact_goal}. Output: 1. A strong Mission Statement. 2. A bold Vision Statement. 3. A formatted list of 3-5 Core Values with brief explanations."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_personas(req):
    prompt = f"Build 2 detailed buyer personas for a {req.product_type} in the {req.industry} industry. Price range: {req.price_range}. Geography: {req.geography}. Include Name, Age, Job, Pain Points, Goals, Preferred Platforms, and Buying Triggers."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_ad_copy(req):
    prompt = f"Write ad copy for {req.platform}. Product: {req.product_service}. USP: {req.usp}. Audience: {req.target_audience}. Output: Headline (max 30 chars), Description (max 90 chars), CTA, and a slightly longer variant."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_hashtags(req):
    prompt = f"Generate 15-30 hashtags for a {req.brand_niche} brand posting about {req.post_topic} on {req.platform}. Tone: {req.tone}. Group them under headers: Popular, Niche, and Branded."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_press_release(req):
    prompt = f"Write a formal Press Release for '{req.brand_name}'. Announcement: {req.announcement_type}. Details: {req.key_details}. Quote: '{req.founder_quote}'. Include standard PR formatting (FOR IMMEDIATE RELEASE, Headline, Dateline, Body, Boilerplate, Media Contact)."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_seo_meta(req):
    prompt = f"Generate SEO metadata for '{req.brand_name}'. Topic: {req.page_topic}. Keyword: {req.target_keyword}. Tone: {req.tone}. Output: Title Tag (max 60 chars), Meta Description (max 160 chars), 5 focus keywords, Open Graph Title & Description."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_faqs(req):
    prompt = f"Write 8-10 Frequently Asked Questions and answers for a {req.business_type} selling {req.product_description} to {req.target_audience}. Anticipate common objections and support queries."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_pitch(req):
    traction_str = f"Traction: {req.traction}." if req.traction else ""
    prompt = f"Business: {req.business_name}. Problem: {req.problem_solved}. Solution: {req.solution}. Market: {req.target_market}. Revenue: {req.revenue_model}. {traction_str} Output: 1. A 60-second elevator pitch. 2. A 5-point investor pitch slide outline."
    result = await call_groq(prompt)
    return {"result": result}

async def summarize_text(req):
    prompt = f"Summarize the following text. Provide exactly: 1. A 3-sentence summary. 2. 5 key bullet points. 3. Suggested brand insights from this text.\n\nText:\n{req.document_text}"
    result = await call_groq(prompt)
    return {"result": result}

async def transcribe_audio(file):
    # Using Groq's fast Whisper implementation for the audio file
    try:
        audio_bytes = await file.read()
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
            temp_audio.write(audio_bytes)
            temp_audio_path = temp_audio.name
            
        with open(temp_audio_path, "rb") as f:
            transcription = groq_client.audio.transcriptions.create(
                file=(file.filename, f.read()),
                model="whisper-large-v3",
            )
        os.remove(temp_audio_path) # cleanup
        return {"text": transcription.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription error: {str(e)}")

async def check_brand_consistency(req):
    pieces = "\n---\n".join(req.content_pieces)
    prompt = f"Analyze these pieces of brand content for consistency:\n{pieces}\n\nOutput: 1. Consistency Score (0-100). 2. Tone alignment analysis. 3. Inconsistency flags. 4. AI improvement suggestions."
    result = await call_groq(prompt)
    return {"result": result}

async def generate_business_card(req):
    prompt = f"Design 3 business card copy layouts (Minimalist, Bold, Creative). Name: {req.name}, Role: {req.role}, Brand: {req.brand_name}, Contact: {req.contact_info}, Tagline: {req.tagline_preference}."
    result = await call_groq(prompt)
    return {"result": result}

async def check_domain_availability(req):
    prompt = f"Generate 10 domain name variations (.com, .io, .co, .ai) for the brand '{req.brand_name}'. Also suggest 3 social media handle formats. Output clearly."
    result = await call_groq(prompt)
    return {"result": result}