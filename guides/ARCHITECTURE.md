# 🏗️ TrendMaster Architecture & Technical Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Frontend (HTML/CSS/JavaScript)          │  │
│  │  • index.html (Form Page)                        │  │
│  │  • results.html (Analytics Page)                 │  │
│  │  • styles.css (Responsive Design)                │  │
│  │  • script.js (Client Logic)                      │  │
│  └────────────────────────┬─────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                HTTP REST API (JSON)
                           │
┌─────────────────────────────────────────────────────────┐
│                  FastAPI Backend                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Python/FastAPI Application               │  │
│  │  • GET / (Serve main page)                       │  │
│  │  • POST /api/analyze (Process analysis)          │  │
│  │  • GET /results (Serve results page)             │  │
│  │  • GET /api/health (Health check)                │  │
│  │                                                   │  │
│  │  • CORS Middleware (Allow frontend requests)     │  │
│  │  • Pydantic Models (Data validation)             │  │
│  └────────────────────────┬────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                  Gemini API Call
                           │
┌─────────────────────────────────────────────────────────┐
│            Google Generative AI (Gemini)                │
│  • LLM-powered trend analysis                           │
│  • Sophisticated prompt engineering                     │
│  • JSON response parsing                                │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Input Flow
```
User fills form → JavaScript validates → POST to /api/analyze
     ↓
Backend receives JSON
     ↓
Constructs sophisticated prompt
     ↓
Calls Gemini API
     ↓
Parses JSON response
     ↓
Returns structured data
     ↓
Frontend stores in sessionStorage
     ↓
Redirects to results page
```

### 2. Results Display Flow
```
Results page loads → JavaScript checks sessionStorage
     ↓
Retrieves analysis results
     ↓
Dynamically populates DOM sections
     ↓
Renders interactive cards and charts
     ↓
User can download report or start new analysis
```

## Technology Stack Details

### Frontend
- **HTML5**: Semantic markup, form handling
- **CSS3**: Grid, Flexbox, Gradients, Animations
- **JavaScript (ES6+)**:
  - Async/await for API calls
  - DOM manipulation
  - Session storage for data persistence
  - Event handling and form validation

### Backend
- **FastAPI**: Modern async Python web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation and serialization
- **python-dotenv**: Environment variable management
- **google-generativeai**: Official Gemini API SDK

## Key Features Explained

### 1. Sophisticated Prompt Engineering
The backend constructs a detailed prompt that:
- Provides context about content creation
- Specifies output JSON structure
- Includes all user parameters
- Requests realistic, current, actionable data
- Focuses on the specific niche

### 2. Response Processing
```python
# 1. Generate content with Gemini
response = model.generate_content(prompt)

# 2. Extract JSON from response text
json_str = response_text[start_idx:end_idx]

# 3. Parse and validate
trend_data = json.loads(json_str)

# 4. Return to frontend
return trend_data
```

### 3. CORS (Cross-Origin Resource Sharing)
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
Allows frontend to make requests from any origin.

### 4. Responsive Design
- Mobile-first CSS approach
- Grid and Flexbox for layout
- Media queries for breakpoints:
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: < 768px

## API Response Structure

### Example /api/analyze Response
```json
{
    "trending_topics": [
        {
            "topic": "string",
            "relevance_score": 0-100,
            "growth_trend": "increasing|stable|decreasing",
            "search_volume": "high|medium|low",
            "audience_interest": "string"
        }
    ],
    "hashtag_strategy": [
        {
            "hashtag": "string",
            "type": "trending|niche|brand",
            "expected_reach": "string"
        }
    ],
    "content_templates": [
        {
            "template_name": "string",
            "duration": "string",
            "structure": "string",
            "key_hooks": ["string"],
            "engagement_tactics": ["string"]
        }
    ],
    "best_posting_times": [...],
    "content_calendar_suggestions": [...],
    "competitor_insights": {...},
    "tools_and_resources": [...]
}
```

## Configuration

### Environment Variables
```env
GEMINI_API_KEY=your_key_here
```

### Server Configuration
- **Host**: 0.0.0.0 (All interfaces)
- **Port**: 8000 (Default)
- **Workers**: 1 (Uvicorn single worker)

## Error Handling

### Frontend
```javascript
try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error();
    // Process results
} catch (error) {
    showError(`Failed to analyze: ${error.message}`);
}
```

### Backend
```python
@app.post("/api/analyze")
async def analyze_trends(user_input: ContentCreatorInput):
    try:
        trend_analysis = generate_trend_analysis(user_input)
        return trend_analysis
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating trends: {str(e)}"
        )
```

## Security Considerations

1. **API Key Management**
   - Stored only in backend `.env`
   - Never exposed to frontend
   - Never committed to version control

2. **Input Validation**
   - Pydantic models validate all inputs
   - HTML escaping prevents XSS
   - Type checking on API boundaries

3. **CORS Configuration**
   - Currently open for development
   - Should be restricted in production
   - Frontend domain should be whitelisted

## Performance Optimizations

1. **Frontend**
   - CSS Grid/Flexbox for efficient layouts
   - Lazy loading considerations
   - SessionStorage for client-side caching

2. **Backend**
   - Async request handling with FastAPI
   - Efficient JSON parsing
   - Single prompt engineering (no multiple calls)

## Scalability Considerations

### Current Architecture
- Single-threaded FastAPI app
- In-memory processing
- No database

### Future Improvements
- Add database (PostgreSQL/MongoDB)
- Implement user authentication
- Cache popular analyses
- Use background tasks for long operations
- Load balance multiple backend instances
- CDN for static assets

## Development Workflow

1. **Local Development**
   - Edit Python files in `backend/`
   - Edit HTML/CSS/JS in `frontend/`
   - Restart server for backend changes
   - Refresh browser for frontend changes

2. **Testing**
   - Manual API testing with curl/Postman
   - Browser developer tools for frontend
   - Check console logs for debugging

3. **Deployment**
   - Use a production ASGI server (Gunicorn)
   - Set up environment variables securely
   - Use HTTPS
   - Implement rate limiting
   - Add monitoring and logging

## Dependencies Overview

```
fastapi==0.104.1          # Web framework
uvicorn==0.24.0           # ASGI server
pydantic==2.5.0           # Data validation
python-dotenv==1.0.0      # Environment variables
google-generativeai==0.3.0 # Gemini API
python-multipart==0.0.6   # Form parsing
```

## Troubleshooting Guide

| Issue | Cause | Solution |
|-------|-------|----------|
| Module not found | Missing dependencies | `pip install -r requirements.txt` |
| API key error | Missing .env | Create .env with API key |
| Port in use | Another app on 8000 | Change port in main.py |
| CORS error | Frontend origin blocked | Check CORS middleware config |
| Gemini error | API limit or invalid key | Verify API key, wait for rate limit |

---

This architecture provides a clean separation between frontend presentation and backend logic, making it easy to extend and maintain.
