from dotenv import load_dotenv; load_dotenv(); import os; api_key = os.getenv('API_KEY')
import requests; import json
from openai import OpenAI

prompt = """You are an expert content strategist and trend analyst specializing in short-form content creation.

Analyze the following content creator profile and provide comprehensive trend analysis and actionable templates:

Content Creator Niche: Self development
Primary Platform: Tiktok
Target Audience: 18-30
Content Style Preference: Educational

Please provide your response in the following JSON format (and ONLY this format MUST):
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




client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=api_key,
)

completion = client.chat.completions.create(
  extra_headers={},
  model="deepseek/deepseek-r1-0528:free",
  messages=[
    {
      "role": "user",
      "content": prompt
    }
  ]
)
print(completion)
print(completion.choices)
print(completion.choices[0])
print(completion.choices[0].message)
print(completion.choices[0].message.content)

res = completion.choices[0].message.content
with open('test.json', 'w') as f:
    f.write(str(res))
