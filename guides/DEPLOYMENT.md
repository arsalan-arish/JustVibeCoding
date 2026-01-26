# 📦 Deployment Guide

## Local Development (Already Setup)

```bash
cd backend
python main.py
```

Access at: http://localhost:8000

---

## Deploy to Heroku

### Prerequisites
- Heroku account (heroku.com)
- Heroku CLI installed

### Steps

1. **Create Procfile**
   ```bash
   echo "web: cd backend && gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app" > Procfile
   ```

2. **Create runtime.txt**
   ```bash
   echo "python-3.11.7" > runtime.txt
   ```

3. **Update requirements.txt** (add gunicorn)
   ```bash
   pip install gunicorn
   pip freeze > backend/requirements.txt
   ```

4. **Initialize git repo**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

5. **Deploy**
   ```bash
   heroku login
   heroku create your-app-name
   heroku config:set GEMINI_API_KEY=your_actual_key
   git push heroku main
   ```

---

## Deploy to PythonAnywhere

### Steps

1. **Create account** at pythonanywhere.com

2. **Upload files**
   - Use their web interface or git
   - Upload `backend/` and `frontend/` directories

3. **Create web app**
   - New web app → Python 3.10 → FastAPI
   - Point to `backend/main.py`

4. **Set environment variables**
   - Add `GEMINI_API_KEY` in web app settings

5. **Reload web app**

---

## Deploy to Railway

### Steps

1. **Create account** at railway.app

2. **Connect GitHub repo**
   - Or upload directly

3. **Set environment variables**
   - Add `GEMINI_API_KEY`

4. **Configure start command**
   ```bash
   cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000
   ```

5. **Deploy automatically**

---

## Deploy to Render

### Steps

1. **Create account** at render.com

2. **Create new Web Service**
   - Connect your GitHub repo

3. **Configure**
   - Runtime: Python 3.10
   - Build command: `pip install -r backend/requirements.txt`
   - Start command: `cd backend && gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`

4. **Set environment variables**
   - `GEMINI_API_KEY`

5. **Deploy**

---

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY frontend/ ./frontend/

ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Create docker-compose.yml

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
```

### Run locally
```bash
docker-compose up
```

### Deploy to Docker Hub
```bash
docker build -t yourusername/trendmaster .
docker push yourusername/trendmaster
```

---

## AWS Elastic Beanstalk

### Steps

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize**
   ```bash
   eb init -p python-3.10 trendmaster
   ```

3. **Create environment**
   ```bash
   eb create trendmaster-env
   ```

4. **Set environment variable**
   ```bash
   eb setenv GEMINI_API_KEY=your_key
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

---

## Production Checklist

Before deploying to production:

- [ ] Set strong environment variables
- [ ] Use HTTPS/SSL certificate
- [ ] Enable CORS properly (don't use `*`)
- [ ] Set up logging and monitoring
- [ ] Configure rate limiting
- [ ] Set up error tracking (Sentry)
- [ ] Use a production database (optional)
- [ ] Set up backups
- [ ] Enable security headers
- [ ] Test thoroughly in staging

### Security Headers (Add to FastAPI)

```python
from fastapi import FastAPI

app = FastAPI()

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response
```

### Rate Limiting (Install slowapi)

```bash
pip install slowapi
```

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/api/analyze")
@limiter.limit("10/minute")
async def analyze_trends(request: Request, user_input: ContentCreatorInput):
    # ... implementation
```

---

## Environment-Specific Configuration

### Development
```env
GEMINI_API_KEY=dev_key
ENVIRONMENT=development
DEBUG=true
```

### Production
```env
GEMINI_API_KEY=prod_key
ENVIRONMENT=production
DEBUG=false
CORS_ORIGINS=["https://yourdomain.com"]
```

---

## Monitoring & Logging

### Add Application Monitoring

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/api/analyze")
async def analyze_trends(user_input: ContentCreatorInput):
    logger.info(f"Analyzing niche: {user_input.niche}")
    try:
        result = generate_trend_analysis(user_input)
        logger.info("Analysis successful")
        return result
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}")
        raise
```

### Use Sentry for Error Tracking

```bash
pip install sentry-sdk
```

```python
import sentry_sdk

sentry_sdk.init(
    dsn="your_sentry_dsn",
    traces_sample_rate=1.0
)
```

---

## Database Integration (Future Enhancement)

### Using PostgreSQL

1. **Install dependencies**
   ```bash
   pip install sqlalchemy psycopg2-binary alembic
   ```

2. **Create database models**
   ```python
   from sqlalchemy import Column, String, Integer, DateTime
   from sqlalchemy.ext.declarative import declarative_base
   
   Base = declarative_base()
   
   class Analysis(Base):
       __tablename__ = "analyses"
       
       id = Column(Integer, primary_key=True)
       user_niche = Column(String)
       results = Column(JSON)
       created_at = Column(DateTime)
   ```

3. **Save results**
   ```python
   # Create and save to database
   analysis = Analysis(user_niche=data.niche, results=trend_analysis)
   db.add(analysis)
   db.commit()
   ```

---

## Continuous Deployment Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: AkhileshNS/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "trendmaster-app"
          heroku_email: "your@email.com"
```

---

## Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| Module not found | Ensure all dependencies in requirements.txt |
| API key not working | Verify env variable name and value |
| Static files not loading | Check file paths in production |
| CORS errors | Update CORS origins for your domain |
| Timeout errors | Increase timeout settings |
| Memory issues | Use more efficient data structures |

---

## Rollback Procedure

### Heroku
```bash
heroku releases
heroku releases:rollback v3
```

### Docker
```bash
docker run -d yourusername/trendmaster:previous-version
```

---

## Cost Estimation

- **Heroku**: $7-50/month
- **Railway**: Pay-as-you-go (~$5-20/month)
- **Render**: Free tier available
- **AWS**: Variable (~$10-100+/month)
- **Gemini API**: Free tier (limited), ~$0.0025/1k tokens

---

## Support & Resources

- FastAPI Docs: https://fastapi.tiangolo.com/deployment/
- Heroku Python: https://devcenter.heroku.com/articles/python
- Docker: https://www.docker.com/
- Railway: https://railway.app/docs
- Render: https://render.com/docs

---

Good luck with your deployment! 🚀
