# 🚀 Quick Start Guide

## For Windows Users

1. **Get your Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key and copy it

2. **Run setup script**
   ```bash
   setup.bat
   ```
   This will install all dependencies and create the .env file

3. **Add your API Key**
   - Open `backend/.env`
   - Replace `your_api_key_here` with your actual Gemini API key
   - Save the file

4. **Start the server**
   ```bash
   cd backend
   python main.py
   ```

5. **Open in browser**
   - Go to: http://localhost:8000
   - Fill in your details and analyze!

---

## For Mac/Linux Users

1. **Get your Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key and copy it

2. **Run setup script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   This will install all dependencies and create the .env file

3. **Add your API Key**
   - Open `backend/.env`
   - Replace `your_api_key_here` with your actual Gemini API key
   - Save the file

4. **Start the server**
   ```bash
   cd backend
   python3 main.py
   ```

5. **Open in browser**
   - Go to: http://localhost:8000
   - Fill in your details and analyze!

---

## Manual Setup (If scripts don't work)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create .env file with your API key**
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the server**
   ```bash
   python main.py
   ```

5. **Open browser to http://localhost:8000**

---

## Troubleshooting

### Issue: "pip: command not found"
- Make sure Python is installed: https://www.python.org/
- Add Python to your PATH environment variable

### Issue: "ModuleNotFoundError: No module named 'fastapi'"
- Run: `pip install -r requirements.txt`

### Issue: "GEMINI_API_KEY not found"
- Check that `.env` file exists in the `backend/` folder
- Verify your API key is correctly set

### Issue: Port 8000 already in use
- Change the port in `backend/main.py`:
  ```python
  uvicorn.run(app, host="0.0.0.0", port=8001)  # Use 8001 instead
  ```

---

## How to Use the App

1. **Fill in your content details**
   - Your niche (e.g., "Fitness", "Tech", "Cooking")
   - Primary platform (TikTok, Instagram, YouTube, etc.)
   - Target audience description
   - Content style preference

2. **Click "Analyze Now"**
   - The AI will analyze trends in your niche
   - This may take 30-60 seconds

3. **View Your Results**
   - Trending topics with relevance scores
   - Optimized hashtags
   - Content templates
   - Best posting times
   - Content calendar
   - Competitor insights
   - Tools & resources

4. **Download Your Report**
   - Click "Download Report" to save as a text file
   - Use for reference and planning

---

## API Key Security

⚠️ **Important**: Never commit your `.env` file to version control!
- The `.env` file is already in `.gitignore`
- Keep your API key private
- If exposed, regenerate the key immediately

---

## What's Next?

- Experiment with different niches and platforms
- Save your favorite insights
- Use templates as inspiration for content
- Track which posting times work best for you

Happy creating! 🎬✨
