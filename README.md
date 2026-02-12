# AI-First CRM HCP Module - Healthcare Professional Interaction Management System

[![Python](https://img.shields.io/badge/Python-3.14+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **An intelligent CRM system designed for Life Sciences field representatives to log, manage, and analyze Healthcare Professional (HCP) interactions using AI-powered natural language processing and LangGraph agents.**

---

## 🎯 Overview

This project implements a cutting-edge Customer Relationship Management (CRM) system specifically designed for the Life Sciences industry. Field representatives can efficiently log HCP interactions through:

- **Structured Form Interface** - Traditional data entry with comprehensive fields
- **AI Chat Assistant** - Natural language interaction logging with auto-fill capabilities
- **LangGraph AI Agent** - Intelligent processing with 5 specialized tools

### Key Features

✅ **Dual Input Modes**
- Professional structured form with sections for all interaction details
- Conversational AI assistant for quick natural language logging

✅ **AI-Powered Auto-Fill**
- Type in chat, watch form fields populate automatically
- Intelligent entity extraction (HCP names, products, sentiment)

✅ **5 LangGraph Tools**
1. **log_interaction** - Log new HCP interactions with AI summarization
2. **edit_interaction** - Modify existing interaction records
3. **search_interactions** - Find interactions by criteria
4. **analyze_sentiment** - AI-powered sentiment analysis
5. **generate_follow_up_plan** - Create actionable follow-up strategies

✅ **Enterprise-Grade UI**
- Clean, professional interface matching industry standards
- Sentiment tracking with emoji indicators (😊 😐 😞)
- Materials & Samples management
- AI-generated follow-up suggestions

✅ **Full-Stack Implementation**
- FastAPI backend with RESTful APIs
- React frontend with Redux state management
- SQLite/PostgreSQL database support
- Complete API documentation

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌─────────────────────┐      ┌──────────────────────┐     │
│  │  Professional Form  │      │   AI Chat Assistant  │     │
│  │  - HCP Details      │◄────►│   - Auto-Fill        │     │
│  │  - Sentiment        │      │   - NLP Extraction   │     │
│  │  - Materials        │      │   - Real-time Chat   │     │
│  └─────────────────────┘      └──────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (FastAPI)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              LangGraph AI Agent                       │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │  │
│  │  │   Log    │ │  Search  │ │ Sentiment│  +2 More   │  │
│  │  │   Tool   │ │   Tool   │ │   Tool   │            │  │
│  │  └──────────┘ └──────────┘ └──────────┘            │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│                  ┌─────────▼─────────┐                      │
│                  │   Groq LLM API    │                      │
│                  │ llama-3.1-8b-instant│                    │
│                  └───────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Database (SQLite/PostgreSQL)                    │
│              - HCP Interactions                              │
│              - Sentiment Scores                              │
│              - Follow-up Plans                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.9+ | Core language |
| FastAPI | 0.109.0 | Web framework |
| LangGraph | 0.0.26 | AI agent orchestration |
| LangChain | 0.1.6 | LLM integration |
| Groq API | Latest | LLM inference (llama-3.1-8b-instant) |
| SQLAlchemy | 2.0.25 | ORM |
| Pydantic | 2.6.0 | Data validation |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| Redux Toolkit | 2.0.1 | State management |
| Axios | 1.6.2 | HTTP client |
| Google Inter | Latest | Typography |

### Database
- SQLite (default - no setup required)
- PostgreSQL (production-ready option)

---

## 📂 Project Structure

```
AI-First-CRM-HCP-Module/
├── backend/
│   ├── agent.py              # LangGraph AI agent with 5 tools
│   ├── main.py               # FastAPI application & API endpoints
│   ├── database.py           # Database connection & session management
│   ├── models.py             # SQLAlchemy database models
│   ├── schemas.py            # Pydantic request/response schemas
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # Environment variables template
│   └── .env                  # Environment configuration (create this)
│
├── frontend/
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── LogInteractionScreen.js    # Main screen component
│   │   │   ├── ProfessionalFormMode.js    # Structured form
│   │   │   ├── AIAssistantPanel.js        # AI chat interface
│   │   │   └── *.css                      # Component styles
│   │   ├── store/
│   │   │   ├── store.js                   # Redux store
│   │   │   └── slices/
│   │   │       ├── interactionSlice.js    # Interactions state
│   │   │       └── chatSlice.js           # Chat state
│   │   ├── App.js                         # Root component
│   │   └── index.js                       # Entry point
│   └── package.json          # Node.js dependencies
│
├── README.md                 # This file
├── LICENSE                   # MIT License
└── .gitignore               # Git ignore rules
```

---

## 🚀 Installation & Setup

### Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher
- npm or yarn
- Groq API Key (free at [console.groq.com](https://console.groq.com))

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/AI-First-CRM-HCP-Module.git
cd AI-First-CRM-HCP-Module/backend
```

2. **Create virtual environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
# Copy example file
cp .env.example .env

# Edit .env and add your Groq API key
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=sqlite:///./crm_hcp.db
```

5. **Start the backend server**
```bash
python main.py
```

✅ Backend will run at: `http://localhost:8000`  
📚 API Documentation: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

✅ Frontend will open at: `http://localhost:3000`

---

## 💻 Usage Guide

### Using the Structured Form

1. Navigate to `http://localhost:3000`
2. Fill in the interaction details:
   - **HCP Name** (required)
   - **Interaction Type** (Meeting, Virtual, Phone, etc.)
   - **Date & Time**
   - **Topics Discussed**
   - **Materials Shared**
   - **Samples Distributed**
   - **Sentiment** (😊 Positive, 😐 Neutral, 😞 Negative)
   - **Follow-up Actions**
3. Click **📝 Log** to save

### Using the AI Chat Assistant (Auto-Fill)

1. Click on the AI Assistant panel (right side)
2. Type a natural language description:

**Example Input:**
```
Met Dr. Sarah Johnson, Cardiologist, at City Hospital. 
We discussed our new heart medication CardioMax for 45 minutes. 
She was very enthusiastic and interested in the clinical trials. 
I provided 15 sample units and we scheduled a follow-up for next month.
```

3. Press **📤 Log**
4. Watch the form auto-fill with extracted data! ✨
5. Review and click **📝 Log** to save

### AI Chat Commands

The AI assistant supports various natural language commands:

**Logging Interactions:**
```
Log a meeting with Dr. Smith about Product X, positive sentiment
```

**Searching:**
```
Search for all cardiologists
Show all interactions
Find meetings about Product X
```

**Listing:**
```
List all interactions
Show recent meetings
```

---

## 🤖 LangGraph AI Agent

### Agent Architecture

The system uses LangGraph to create an intelligent agent that can:
- Understand natural language queries
- Select appropriate tools based on user intent
- Execute multiple tools in sequence if needed
- Provide formatted, actionable responses

### The 5 Tools

#### 1. **log_interaction**
```python
Purpose: Log new HCP interactions with entity extraction
Input: Interaction details in natural language
Output: Success confirmation with interaction ID
AI Features: 
  - Automatic HCP name extraction
  - Product identification
  - Sentiment detection
  - Key insights generation
```

#### 2. **edit_interaction**
```python
Purpose: Modify existing interaction records
Input: Interaction ID + fields to update
Output: Updated interaction data
```

#### 3. **search_interactions**
```python
Purpose: Find interactions matching criteria
Input: Search parameters (name, specialty, type)
Output: List of matching interactions
```

#### 4. **analyze_sentiment**
```python
Purpose: AI-powered sentiment analysis
Input: Interaction text
Output: Sentiment score, insights, recommendations
LLM Analysis:
  - 0-10 sentiment score
  - Positive/Neutral/Negative classification
  - Key insights extraction
  - Next steps recommendations
```

#### 5. **generate_follow_up_plan**
```python
Purpose: Create detailed follow-up action plans
Input: Interaction ID
Output: Comprehensive follow-up strategy
LLM Generation:
  - Timeline recommendations
  - Talking points for next meeting
  - Required materials
  - Specific action items
```

### Agent Flow

```
User Input
    ↓
LangGraph Agent (LLM)
    ↓
Tool Selection & Reasoning
    ↓
Tool Execution
    ↓
Response Synthesis
    ↓
Natural Language Output
```

---

## 📊 Database Schema

### HCPInteraction Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | Integer | Primary key, auto-increment |
| `hcp_name` | String(255) | Healthcare professional name |
| `hcp_specialty` | String(255) | Medical specialty |
| `interaction_date` | DateTime | When interaction occurred |
| `interaction_type` | String(100) | Type (In-Person, Virtual, etc.) |
| `location` | String(255) | Meeting location |
| `duration_minutes` | Integer | Meeting duration |
| `discussion_topics` | Text | Topics discussed |
| `products_discussed` | Text | Products mentioned |
| `samples_provided` | String(500) | Sample units given |
| `next_steps` | Text | Follow-up actions |
| `sentiment_score` | Float | AI-generated sentiment (0-10) |
| `key_insights` | Text | AI-extracted insights |
| `follow_up_date` | DateTime | Scheduled follow-up |
| `sales_rep_name` | String(255) | Representative name |
| `created_at` | DateTime | Record creation timestamp |
| `updated_at` | DateTime | Last update timestamp |
| `is_active` | Boolean | Soft delete flag |

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:8000
```

### Endpoints

#### **GET /**
```
Description: API health check and information
Response: API version, status, available endpoints
```

#### **POST /interactions/**
```
Description: Create new HCP interaction (structured form)
Request Body: InteractionCreate schema
Response: InteractionResponse with ID
```

#### **GET /interactions/**
```
Description: Get all interactions
Query Params: skip (int), limit (int)
Response: List of InteractionResponse
```

#### **GET /interactions/{id}**
```
Description: Get specific interaction by ID
Path Param: interaction_id (int)
Response: InteractionResponse
```

#### **PUT /interactions/{id}**
```
Description: Update existing interaction
Path Param: interaction_id (int)
Request Body: InteractionUpdate schema
Response: Updated InteractionResponse
```

#### **DELETE /interactions/{id}**
```
Description: Soft delete interaction
Path Param: interaction_id (int)
Response: Success message
```

#### **POST /chat/**
```
Description: AI chat interface - Main feature
Request Body: {"message": "string"}
Response: {"response": "string", "timestamp": "datetime"}

Example:
POST /chat/
{
  "message": "Log meeting with Dr. Smith about CardioMax"
}

Response:
{
  "response": "✅ Interaction Logged Successfully!\n\n📋 Interaction ID: 1\n...",
  "timestamp": "2025-01-20T10:30:00"
}
```

#### **GET /tools/**
```
Description: List available AI agent features
Response: Array of tool descriptions
```

#### **GET /interactions-memory/**
```
Description: View agent's in-memory interactions (testing)
Response: Count and list of interactions
```

### Interactive API Documentation

Visit `http://localhost:8000/docs` for:
- Interactive Swagger UI
- Try out endpoints directly
- View request/response schemas
- Test authentication

---

## 🎨 UI/UX Features

### Design System

**Colors:**
- Primary Blue: `#3b82f6`
- Success Green: `#10b981`
- Background: `#f5f7fa`
- Text Dark: `#1f2937`
- Border: `#e5e7eb`

**Typography:**
- Font Family: Inter (Google Fonts)
- Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold)

### Key UI Components

1. **Professional Form**
   - Sectioned layout with clear headers
   - Grid-based responsive design
   - Radio buttons for sentiment
   - Search/Add buttons for materials

2. **AI Assistant Panel**
   - Chat-style interface
   - Example prompts
   - Typing indicators
   - Auto-fill notifications

3. **Auto-Fill Animation**
   - Green success notification
   - Smooth field population
   - Visual feedback

### Responsive Design
- Desktop: Side-by-side layout (form + assistant)
- Tablet/Mobile: Stacked layout
- Breakpoint: 1200px

---

## 🧪 Testing

### Manual Testing Checklist

**Backend:**
- [ ] Server starts without errors
- [ ] API docs accessible at /docs
- [ ] All endpoints respond correctly
- [ ] Database connection works
- [ ] AI agent processes messages

**Frontend:**
- [ ] Application loads at localhost:3000
- [ ] Form submission works
- [ ] AI chat sends messages
- [ ] Auto-fill populates fields
- [ ] Sentiment selection works
- [ ] Data persists to backend

### Example Test Cases

**Test 1: Form Submission**
```
1. Fill HCP Name: "Dr. Test User"
2. Select Sentiment: Positive
3. Add topics: "Product discussion"
4. Click Log
5. Verify success message
6. Check backend /interactions endpoint
```

**Test 2: AI Auto-Fill**
```
1. Type in AI: "Met Dr. Johnson, discussed CardioMax, very positive"
2. Click Log
3. Verify form fields populate:
   - HCP Name: "Dr. Johnson"
   - Products: "CardioMax"
   - Sentiment: "Positive"
4. Submit form
5. Verify data in backend
```

**Test 3: Search**
```
1. Log multiple interactions
2. Type in AI: "Search for Dr. Johnson"
3. Verify search results returned
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file in backend directory:

```env
# Required
GROQ_API_KEY=gsk_your_groq_api_key_here

# Database (choose one)
DATABASE_URL=sqlite:///./crm_hcp.db                          # SQLite (default)
# DATABASE_URL=postgresql://user:password@localhost/crm_db  # PostgreSQL

# Optional
DEBUG=True
LOG_LEVEL=INFO
```

### Groq API Setup

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for free account
3. Navigate to API Keys
4. Click "Create API Key"
5. Copy key (starts with `gsk_`)
6. Add to `.env` file

### Database Options

**SQLite (Default - Recommended for Development):**
- No setup required
- File-based database
- Perfect for development/testing
```env
DATABASE_URL=sqlite:///./crm_hcp.db
```

**PostgreSQL (Production):**
```bash
# Install PostgreSQL
# Create database
createdb crm_hcp_db

# Update .env
DATABASE_URL=postgresql://user:password@localhost/crm_hcp_db
```

---

## 🚨 Troubleshooting

### Common Issues & Solutions

#### Backend won't start

**Error: `GROQ_API_KEY not found`**
```bash
Solution:
1. Check .env file exists in backend directory
2. Verify GROQ_API_KEY is set correctly
3. Restart terminal/virtual environment
```

**Error: `Module not found`**
```bash
Solution:
pip install -r requirements.txt --force-reinstall
```

**Error: `Port 8000 already in use`**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <process_id> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

#### Frontend Issues

**Error: `Cannot find module`**
```bash
Solution:
rm -rf node_modules package-lock.json
npm install
```

**Error: `CORS policy`**
```bash
Solution:
1. Ensure backend is running on port 8000
2. Check backend CORS middleware is enabled
3. Refresh browser
```

#### AI Agent Issues

**Agent not responding / Timeout**
```bash
Solution:
1. Check Groq API key is valid
2. Verify internet connection
3. Check Groq API status
4. Model may be rate-limited (wait 30 seconds)
```

**Auto-fill not working**
```bash
Solution:
1. Ensure you're typing in AI Assistant panel
2. Include "Dr." in message for HCP detection
3. Mention products explicitly
4. Use sentiment keywords (positive, negative)
```

---

## 📈 Future Enhancements

- [ ] User authentication & authorization
- [ ] Multi-user support with role-based access
- [ ] Advanced analytics dashboard
- [ ] Export to PDF/Excel
- [ ] Email integration for follow-ups
- [ ] Calendar sync for scheduled meetings
- [ ] Mobile application (React Native)
- [ ] Voice recording & transcription
- [ ] Multi-language support
- [ ] Real-time collaboration
- [ ] Advanced search filters
- [ ] Data visualization charts
- [ ] Integration with CRM systems (Salesforce, etc.)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- **Python:** Follow PEP 8
- **JavaScript:** ESLint with Airbnb config
- **Commits:** Use conventional commits format
- **Documentation:** Update README for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@YASH-02042002](https://github.com/YASH-02042002)
- LinkedIn: [www.linkedin.com/in/yash-paliwal-b7240a25b](https://linkedin.com/in/yourprofile)
- Email: yashpaliwal100@gmail.com

---

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for LangGraph framework
- [Groq](https://groq.com/) for fast LLM inference
- [FastAPI](https://fastapi.tiangolo.com/) team for excellent documentation
- [React](https://reactjs.org/) community
- Life Sciences professionals who provided domain insights

---

## 📞 Support

For questions, issues, or feedback:

- **Issues:** [GitHub Issues](https://github.com/yourusername/AI-First-CRM-HCP-Module/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/AI-First-CRM-HCP-Module/discussions)
- **Email:** support@example.com

---


<div align="center">

### ⭐ If you found this project helpful, please give it a star!

Made with ❤️ for the Life Sciences community

</div>
