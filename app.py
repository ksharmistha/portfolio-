"""
Modern Portfolio Website - Flask Backend
Author: Portfolio Generator
Description: A beautiful, interactive portfolio for Computer Science students
"""

from flask import Flask, render_template, request, jsonify
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Portfolio Data
PORTFOLIO_DATA = {
    'name': 'Keerthana N',
    'title': 'Computer Science Engineering Student',
    'subtitle': 'Aspiring Software Engineer | AI & Data Enthusiast',
    'tagline': 'Passionate about building innovative solutions through technology and continuous learning.',
    'email': 'keerthana@example.com',
    'location': 'Hyderabad, India',
    'social_links': {
        'linkedin': 'https://linkedin.com/in/keerthana',
        'github': 'https://github.com/keerthana',
        'leetcode': 'https://leetcode.com/keerthana',
        'hackerrank': 'https://hackerrank.com/keerthana'
    },
    'skills': {
        'programming': ['Java', 'Python', 'C', 'SQL'],
        'web_development': ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Flask'],
        'databases': ['MySQL', 'MongoDB'],
        'data_science': ['R Programming', 'Data Analysis', 'Data Visualization'],
        'tools': ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook']
    },
    'education': [
        {
            'degree': 'Bachelor of Technology (CSE)',
            'institution': 'Your College Name',
            'year': '2022 – 2026'
        },
        {
            'degree': 'Intermediate',
            'institution': 'College Name',
            'year': '2020 – 2022'
        },
        {
            'degree': 'Schooling',
            'institution': 'School Name',
            'year': '2008 – 2020'
        }
    ],
    'stats': {
        'projects': '15+',
        'certifications': '8',
        'technologies': '25+',
        'problems_solved': '500+'
    }
}

# Routes
@app.route('/')
def home():
    """Home page route"""
    return render_template('index.html', data=PORTFOLIO_DATA)

@app.route('/about')
def about():
    """About page route"""
    return render_template('about.html', data=PORTFOLIO_DATA)

@app.route('/education')
def education():
    """Education & Skills page route"""
    return render_template('education.html', data=PORTFOLIO_DATA)

@app.route('/connect')
def connect():
    """Connect/Contact page route"""
    return render_template('connect.html', data=PORTFOLIO_DATA)

@app.route('/why-hire')
def why_hire():
    """Why Hire Me page route"""
    return render_template('why-hire.html', data=PORTFOLIO_DATA)

# API endpoint for contact form
@app.route('/api/contact', methods=['POST'])
def contact_form():
    """Handle contact form submissions"""
    try:
        data = request.json
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')
        
        # Validate input
        if not all([name, email, message]):
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        # Here you would typically save to database or send email
        # For now, just return success
        print(f"Contact form submission: {name} ({email}) - {message}")
        
        return jsonify({
            'success': True,
            'message': 'Thank you for reaching out! I will get back to you soon.'
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)