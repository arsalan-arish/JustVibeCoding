# 📊 TrendMaster - Content Analytics Platform

A modern web application that helps content creators discover trending topics, templates, and analytics for their niche using AI-powered analysis powered by Google Gemini.

## 🌟 Features

- **Trending Topics Analysis**: Get real-time trending topics in your niche with growth metrics
- **Hashtag Strategy**: Optimized hashtag recommendations with reach predictions
- **Content Templates**: Ready-to-use content formats with engagement tactics
- **Posting Time Optimization**: Data-driven recommendations for maximum engagement
- **Content Calendar**: 30-day strategic planning suggestions
- **Competitor Insights**: Analyze top performers and discover opportunities
- **Recommended Tools**: Curated list of tools and resources for your niche

## 🏗️ Project Structure

```
App/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── .env.example         # Example environment variables
├── frontend/
│   ├── index.html           # Main page (form)
│   ├── results.html         # Analytics results page
│   ├── styles.css           # Styling
│   └── script.js            # Frontend logic
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone or download the project**
   ```bash
   cd App
   ```

2. **Set up the backend**
   ```bash
   cd backend
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

5. **Run the backend server**
   ```bash
   python main.py
   ```
   
   The server will start on `http://localhost:8000`

6. **Open the frontend**
   - Navigate to `http://localhost:8000` in your browser
   - The frontend files are served by the FastAPI server

## 📖 Usage

1. **Navigate to the home page** (`http://localhost:8000`)
2. **Fill in your details**:
   - Your content niche (e.g., "Fitness", "Personal Finance")
   - Primary platform (TikTok, Instagram Reels, YouTube Shorts, etc.)
   - Target audience description
   - Content style preference

3. **Click "Analyze Now"** to generate analytics

4. **Review your results** which include:
   - Trending topics with relevance scores
   - Hashtag strategy with reach estimates
   - Content templates with engagement hooks
   - Best posting times
   - Content calendar suggestions
   - Competitor insights
   - Recommended tools

5. **Download your report** as a text file for reference

## 🔧 API Endpoints

### GET `/`
Serves the main HTML page

### POST `/api/analyze`
Analyzes trends based on user input

**Request Body:**
```json
{
    "niche": "Fitness",
    "platform": "TikTok",
    "target_audience": "18-35 year old fitness enthusiasts",
    "content_style": "Educational and motivational"
}
```

**Response:**
Returns comprehensive analytics including:
- Trending topics with metrics
- Hashtag strategy
- Content templates
- Posting time recommendations
- Content calendar suggestions
- Competitor insights
- Tool recommendations

### GET `/results`
Serves the results/analytics page

### GET `/api/health`
Health check endpoint

## 🤖 How It Works

1. **User Input**: Content creators provide details about their niche and platform
2. **Prompt Engineering**: A sophisticated prompt is crafted to query the Gemini API
3. **AI Analysis**: Google Gemini analyzes trends and generates comprehensive insights
4. **Data Processing**: The backend parses and structures the AI response
5. **Visualization**: The frontend displays results in an interactive, user-friendly format

## 📝 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_api_key_here
```

## 🎨 Technology Stack

### Frontend
- HTML5
- CSS3 (with modern features like Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- Responsive design for mobile and desktop

### Backend
- Python
- FastAPI (modern web framework)
- Pydantic (data validation)
- Google Generative AI SDK

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop browsers
- Tablets
- Mobile devices

## 🔐 Security Notes

- Keep your `.env` file private and never commit it to version control
- The API key should only be stored server-side (in the backend)
- Frontend communicates with backend through secure HTTP requests

## 🐛 Troubleshooting

### Issue: "GEMINI_API_KEY not found"
**Solution**: Make sure you've created a `.env` file in the `backend/` directory with your API key

### Issue: Frontend not loading
**Solution**: Ensure the backend server is running on `http://localhost:8000`

### Issue: CORS errors in browser console
**Solution**: CORS is already configured in the backend. If issues persist, ensure the frontend is being served from the backend

### Issue: API rate limiting
**Solution**: The Gemini API may have rate limits. Wait a moment before making another request

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Python-dotenv](https://github.com/theskumar/python-dotenv)

## 🤝 Future Enhancements

- Database integration for user accounts and saved analyses
- Export to PDF with better formatting
- Historical analytics comparison
- Team collaboration features
- Custom AI prompts
- Integration with social media APIs
- Advanced filtering and sorting of results

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Built by an experienced software engineer for content creators worldwide.

---

**TrendMaster** - Empowering content creators with data-driven insights! 🚀
