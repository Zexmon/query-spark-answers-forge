
# Flask Backend Setup Guide

This React frontend is designed to work with a Flask backend. Here's the Flask code structure you need to create:

## Flask Backend Code (app.py)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Your dataset - replace this with your actual data
QUESTIONS_DATA = [
    {
        "id": 1,
        "question": "What are the fundamental principles of public buying?",
        "answer": "Transparency, competition, fairness, and value for money are the key principles of public procurement. These principles ensure that the procurement process is conducted in an open, competitive manner that provides the best value for public funds while maintaining integrity and accountability.",
        "category": "Fundamental Principles"
    },
    # Add all your questions here...
]

@app.route('/api/search', methods=['GET'])
def search_questions():
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    
    results = QUESTIONS_DATA
    
    # Filter by category
    if category and category != 'All':
        results = [q for q in results if q['category'] == category]
    
    # Filter by search query
    if query:
        query = query.lower()
        results = [
            q for q in results 
            if query in q['question'].lower() or query in q['answer'].lower()
        ]
    
    return jsonify(results)

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = list(set(q['category'] for q in QUESTIONS_DATA))
    return jsonify(['All'] + sorted(categories))

@app.route('/api/questions', methods=['GET'])
def get_all_questions():
    return jsonify(QUESTIONS_DATA)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## Installation Steps

1. Create a new folder for your Flask backend
2. Install Flask and Flask-CORS:
   ```bash
   pip install flask flask-cors
   ```
3. Create `app.py` with the code above
4. Add your complete dataset to the `QUESTIONS_DATA` list
5. Run the Flask server:
   ```bash
   python app.py
   ```

## Frontend Integration

The React frontend is already configured to work with your Flask backend at `http://localhost:5000`. 

To use the real API instead of mock data:
1. Update the `ApiService.tsx` file with your Flask server URL
2. Replace the mock search logic in `QuerySystem.tsx` with actual API calls

## API Endpoints

- `GET /api/search?q=query&category=category` - Search questions
- `GET /api/categories` - Get all categories
- `GET /api/questions` - Get all questions

Your React frontend will automatically connect to these endpoints!
