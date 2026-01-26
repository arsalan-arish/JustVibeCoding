# ✅ TrendMaster Setup Checklist

## Pre-Setup Requirements

- [ ] Python 3.8+ installed on your system
- [ ] pip package manager available
- [ ] A text editor or IDE (VS Code, PyCharm, etc.)
- [ ] Internet connection (for API calls)
- [ ] Gemini API key obtained

## Setup Process

### 1. Get Gemini API Key
- [ ] Visit https://makersuite.google.com/app/apikey
- [ ] Sign in with Google account
- [ ] Click "Create API Key"
- [ ] Copy the API key
- [ ] Keep it safe and secret

### 2. Install Dependencies

#### Windows Users
- [ ] Open Command Prompt or PowerShell
- [ ] Navigate to the App directory
- [ ] Run `setup.bat`
- [ ] Wait for installation to complete

#### Mac/Linux Users
- [ ] Open Terminal
- [ ] Navigate to the App directory
- [ ] Run `chmod +x setup.sh`
- [ ] Run `./setup.sh`
- [ ] Wait for installation to complete

#### Manual Setup (If scripts don't work)
- [ ] Navigate to backend folder: `cd backend`
- [ ] Run: `pip install -r requirements.txt`
- [ ] Run: `pip install google-generativeai` (if not in requirements)

### 3. Configure API Key
- [ ] Open `backend/.env` file
- [ ] Replace `your_api_key_here` with your actual Gemini API key
- [ ] Save the file
- [ ] ⚠️ DO NOT share this file or commit it to git!

## First Run

### Step 1: Start the Backend Server
- [ ] Open terminal/command prompt
- [ ] Navigate to backend folder: `cd backend`
- [ ] Run: `python main.py` (or `python3 main.py` on Mac/Linux)
- [ ] You should see: `Uvicorn running on http://0.0.0.0:8000`

### Step 2: Open in Browser
- [ ] Open your web browser
- [ ] Go to: `http://localhost:8000`
- [ ] You should see the TrendMaster homepage
- [ ] Form should load with input fields

### Step 3: Test the Application
- [ ] Fill in the form with test data:
  - [ ] Niche: "Fitness"
  - [ ] Platform: "TikTok"
  - [ ] Target Audience: "18-35 year old gym enthusiasts"
  - [ ] Content Style: "Educational and motivational"
- [ ] Click "Analyze Now"
- [ ] Wait for analysis to complete (30-60 seconds)
- [ ] Results page should load with:
  - [ ] Trending topics visible
  - [ ] Hashtag strategy displayed
  - [ ] Content templates shown
  - [ ] Posting times recommendations
  - [ ] Other analytics sections

### Step 4: Test Features
- [ ] Click on different trending topics (should be interactive)
- [ ] Scroll through all sections
- [ ] Click "Download Report" button
- [ ] Verify report downloads successfully
- [ ] Click "← New Analysis" to go back to form

## Troubleshooting Checklist

### Issue: "ModuleNotFoundError: No module named 'fastapi'"
- [ ] Run: `pip install -r backend/requirements.txt`
- [ ] Make sure you're in the backend directory
- [ ] Check Python version is 3.8+: `python --version`

### Issue: "GEMINI_API_KEY not found"
- [ ] Verify `.env` file exists in backend folder
- [ ] Check API key is correctly set (no extra spaces)
- [ ] Restart the server after adding the key

### Issue: "Port 8000 already in use"
- [ ] Find what's using port 8000
- [ ] Or change port in `backend/main.py` line: `port=8000` to `port=8001`
- [ ] Then access at `http://localhost:8001`

### Issue: Browser shows "Cannot GET /api/analyze"
- [ ] Make sure backend server is running
- [ ] Check server logs for errors
- [ ] Verify frontend is being served (index.html loads)
- [ ] Check browser console for JavaScript errors (F12)

### Issue: "Failed to analyze: HTTP error!"
- [ ] Check Gemini API key is correct
- [ ] Verify you have sufficient API credits
- [ ] Check if API rate limit exceeded (wait a minute)
- [ ] Look at server logs for detailed error message

### Issue: Results page shows "No analysis data found"
- [ ] This means the form wasn't submitted properly
- [ ] Go back and submit the form again
- [ ] Check browser console for errors

## Project Structure Verification

After setup, verify you have all these files:

```
App/
├── backend/
│   ├── main.py ✓
│   ├── requirements.txt ✓
│   ├── .env ✓
│   └── .env.example ✓
├── frontend/
│   ├── index.html ✓
│   ├── results.html ✓
│   ├── styles.css ✓
│   └── script.js ✓
├── README.md ✓
├── QUICKSTART.md ✓
├── ARCHITECTURE.md ✓
├── DEPLOYMENT.md ✓
├── PROJECT_SUMMARY.md ✓
├── .gitignore ✓
├── setup.bat ✓
└── setup.sh ✓
```

## Configuration Verification

- [ ] `.env` file has your API key
- [ ] No `.env` in `.gitignore` (already added)
- [ ] `requirements.txt` has all dependencies
- [ ] Python can import all required modules
- [ ] Backend server runs without errors

## Functionality Testing

### Form Page Tests
- [ ] Page loads without errors
- [ ] Form fields are visible
- [ ] Form is responsive on mobile
- [ ] Submit button works
- [ ] Error messages appear for empty fields
- [ ] Loading spinner shows during analysis

### Results Page Tests
- [ ] Results page loads after analysis
- [ ] All sections are populated with data
- [ ] Cards and styling look correct
- [ ] Download button works
- [ ] "New Analysis" button works
- [ ] Results are relevant to input data

### Data Flow Tests
- [ ] Form data is sent to backend
- [ ] Backend processes the data
- [ ] Gemini API is called successfully
- [ ] Response is parsed correctly
- [ ] Frontend receives valid JSON
- [ ] Results are displayed properly

## Performance Checklist

- [ ] Page load time is reasonable (< 3 seconds)
- [ ] Form submission completes in < 60 seconds
- [ ] No console errors or warnings
- [ ] Images/styling load correctly
- [ ] Responsive on mobile devices
- [ ] Desktop layout looks professional

## Security Checklist

- [ ] `.env` file is NOT in git commits
- [ ] API key is NOT visible in browser
- [ ] API key is NOT in frontend code
- [ ] No sensitive data in browser console
- [ ] HTTPS ready for production deployment

## Deployment Readiness

- [ ] Application works locally
- [ ] No hardcoded passwords or secrets
- [ ] Environment variables properly configured
- [ ] Error handling is robust
- [ ] Ready for production (see DEPLOYMENT.md)

## Optional Enhancements

- [ ] Add more test data/examples
- [ ] Customize styling/branding
- [ ] Add Google Analytics
- [ ] Set up logging
- [ ] Create database schema (for future)
- [ ] Plan mobile app version
- [ ] Consider premium features

## Documentation Review

- [ ] Read README.md ✓
- [ ] Read QUICKSTART.md ✓
- [ ] Reviewed ARCHITECTURE.md ✓
- [ ] Reviewed DEPLOYMENT.md ✓
- [ ] Reviewed PROJECT_SUMMARY.md ✓

## Next Steps

After successful setup:

1. **Test with different niches**
   - [ ] Fitness/Health
   - [ ] Finance/Business
   - [ ] Tech/Programming
   - [ ] Beauty/Cosmetics
   - [ ] Travel/Adventure

2. **Explore features**
   - [ ] Download multiple reports
   - [ ] Compare different niches
   - [ ] Test different platforms
   - [ ] Review hashtag strategies

3. **Customize (Optional)**
   - [ ] Change colors in `frontend/styles.css`
   - [ ] Modify branding in HTML
   - [ ] Adjust prompt in `backend/main.py`
   - [ ] Add more form fields

4. **Deploy to production**
   - [ ] Choose hosting provider
   - [ ] Follow DEPLOYMENT.md guide
   - [ ] Set up custom domain
   - [ ] Enable HTTPS
   - [ ] Share with users

5. **Monitor & Improve**
   - [ ] Collect user feedback
   - [ ] Monitor error logs
   - [ ] Track API usage
   - [ ] Plan new features

## Support Resources

- 📖 [FastAPI Docs](https://fastapi.tiangolo.com/)
- 🤖 [Gemini API Docs](https://ai.google.dev/)
- 💬 [Python Community](https://www.python.org/)
- 🌐 [MDN Web Docs](https://developer.mozilla.org/)

## Final Checklist

- [ ] All files created successfully
- [ ] Dependencies installed
- [ ] API key configured
- [ ] Server starts without errors
- [ ] Frontend loads in browser
- [ ] Analysis works end-to-end
- [ ] Results display correctly
- [ ] Reports download successfully
- [ ] No critical errors
- [ ] Ready for use!

---

## 🎉 Success!

If all checkboxes are complete, your TrendMaster application is ready to use!

### You can now:
✅ Analyze trends for any content niche
✅ Get AI-powered insights
✅ Download professional reports
✅ Help content creators succeed

---

**Congratulations on setting up TrendMaster! 🚀**

For questions or issues, review the documentation files or check the troubleshooting section above.

Good luck! 📊✨
