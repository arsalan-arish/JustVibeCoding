from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=api_key)


class ContentCreatorInput(BaseModel):
    niche: str
    platform: str
    target_audience: str
    content_style: str


def generate_trend_analysis(user_input: ContentCreatorInput) -> dict:
    """Generate trend analysis and templates using Gemini API with sophisticated prompt"""
    
    prompt = f"""You are an expert content strategist and trend analyst specializing in short-form content creation.

Analyze the following content creator profile and provide comprehensive trend analysis and actionable templates:

Content Creator Niche: {user_input.niche}
Primary Platform: {user_input.platform}
Target Audience: {user_input.target_audience}
Content Style Preference: {user_input.content_style}

Please provide your response in the following JSON format (and ONLY this format):
{{
    "trending_topics": [
        {{
            "topic": "topic name",
            "relevance_score": 0-100,
            "growth_trend": "increasing/stable/decreasing",
            "search_volume": "high/medium/low",
            "audience_interest": "description of why this matters"
        }}
    ],
    "hashtag_strategy": [
        {{
            "hashtag": "#example",
            "type": "trending/niche/brand",
            "expected_reach": "number range"
        }}
    ],
    "content_templates": [
        {{
            "template_name": "name",
            "duration": "seconds",
            "structure": "step by step structure",
            "key_hooks": ["hook1", "hook2"],
            "engagement_tactics": ["tactic1", "tactic2"]
        }}
    ],
    "best_posting_times": [
        {{
            "day": "day of week",
            "time": "HH:MM (24-hour format)",
            "expected_engagement": "percentage/rating"
        }}
    ],
    "content_calendar_suggestions": [
        "suggestion 1",
        "suggestion 2",
        "suggestion 3"
    ],
    "competitor_insights": {{
        "top_performing_formats": ["format1", "format2"],
        "common_pain_points": ["issue1", "issue2"],
        "opportunities": ["opportunity1", "opportunity2"]
    }},
    "tools_and_resources": [
        {{
            "tool_name": "name",
            "purpose": "what it does",
            "cost": "free/paid"
        }}
    ]
}}

Ensure all data is realistic, current, and actionable. Base recommendations on actual trends in the {user_input.niche} niche."""

    model = genai.GenerativeModel("gemini-pro")
    
    try:
        response = model.generate_content(prompt)
        response_text = response.text
        
        # Extract JSON from response
        start_idx = response_text.find('{')
        end_idx = response_text.rfind('}') + 1
        
        if start_idx != -1 and end_idx > start_idx:
            json_str = response_text[start_idx:end_idx]
            trend_data = json.loads(json_str)
        else:
            raise ValueError("Could not extract JSON from response")
        
        return trend_data
    
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse API response: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating trends: {str(e)}"
        )


@app.get("/")
async def get_main_page():
    """Serve the main page"""
    return FileResponse("../frontend/index.html", media_type="text/html")


@app.post("/api/analyze")
async def analyze_trends(user_input: ContentCreatorInput):
    """Generate trend analysis based on user input"""
    trend_analysis = generate_trend_analysis(user_input)
    return trend_analysis


@app.get("/results")
async def get_results_page():
    """Serve the results/analytics page"""
    return FileResponse("../frontend/results.html", media_type="text/html")


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Content Trend Analyzer"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
