# Nyay Sarthi - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Docker and Docker Compose (optional)

### 1. Environment Setup

#### Backend Environment Variables
Create `backend/.env` file:
```env
# Application settings
APP_NAME=Nyay Sarthi
APP_VERSION=1.0.0
DEBUG=true

# Database settings
DATABASE_URL=sqlite:///./data/nyay_sarthi.db

# Security settings
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Vector database settings
CHROMA_PERSIST_DIRECTORY=./vector_db

# File upload settings
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# Logging settings
LOG_DIR=./logs
LOG_LEVEL=INFO

# External API settings - ADD YOUR ACTUAL API KEYS HERE
OPENAI_API_KEY=your-openai-api-key-here
INDIAN_KANOON_API_KEY=your-indian-kanoon-api-key-here
HUGGINGFACE_API_KEY=your-huggingface-api-key-here

# Redis settings
REDIS_URL=redis://localhost:6379
```

#### Frontend Environment Variables
Create `frontend/.env` file:
```env
VITE_BACKEND_URL=http://localhost:8000
```

### 2. Install Dependencies

```bash
# Install all dependencies (frontend + backend)
npm run install:all
```

Or install individually:
```bash
# Frontend dependencies
cd frontend && npm install

# Backend dependencies
cd backend && pip install -r requirements.txt
```

### 3. Start Development Servers

#### Option 1: Start Both Services
```bash
npm run dev
```

#### Option 2: Start Individually
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🔧 API Integration

### Real Data Sources

The application now uses real APIs instead of static data:

1. **Indian Kanoon API**: For legal precedents and case law
2. **Hugging Face API**: For AI-powered legal assistance and document analysis
3. **OpenAI API**: For advanced language processing (optional)

### Backend Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/token` - User login
- `GET /auth/me` - Get current user

#### Legal Services
- `POST /api/legal/search-precedents` - Search legal precedents
- `GET /api/legal/precedent/{id}` - Get precedent details
- `POST /api/legal/chat` - AI legal assistant chat
- `POST /api/legal/analyze-document` - Document analysis
- `GET /api/legal/courts` - Available courts
- `GET /api/legal/recent-cases` - Recent cases

### Frontend Integration

The frontend now connects to the real backend APIs:

1. **Authentication**: Real JWT-based authentication
2. **Precedent Search**: Real Indian Kanoon data
3. **AI Chat**: Real Hugging Face AI responses
4. **Document Analysis**: Real AI-powered analysis

## 🔐 Authentication

### Demo Credentials
You can create users through the registration endpoint or use these demo credentials:

**Admin User:**
- Email: admin@nyaysarthi.com
- Password: admin123

**Regular User:**
- Email: user@example.com
- Password: password

### User Roles
- **User**: Access to legal tools and AI assistant
- **Admin**: Full access including settings and user management

## 🐳 Docker Setup

### Start with Docker
```bash
npm run docker:dev
```

### Build Containers
```bash
npm run docker:build
```

### Stop Services
```bash
npm run docker:down
```

## 📁 Project Structure

```
nyay-sarthi/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── ...
│   ├── package.json
│   └── Dockerfile
├── backend/                 # FastAPI + Python backend
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── core/          # Configuration
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   └── services/      # Business logic
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🔍 Features

### ✅ Implemented
- [x] Real API integration with Indian Kanoon
- [x] AI-powered legal assistant using Hugging Face
- [x] Document analysis and summarization
- [x] JWT-based authentication
- [x] User role management (admin/user)
- [x] Precedent search and details
- [x] Chat interface with AI
- [x] File upload and analysis
- [x] Responsive UI with dark mode

### 🚧 In Progress
- [ ] Vector database integration
- [ ] Advanced document processing
- [ ] Real-time notifications
- [ ] User preferences and settings

## 🛠️ Development

### Backend Development
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Database Migrations
```bash
cd backend
alembic upgrade head
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation with Pydantic
- Rate limiting (to be implemented)

## 📊 Monitoring

- Health check endpoint: `GET /health`
- Application logs in `backend/logs/`
- Error handling and fallbacks

## 🤝 Support

For issues and questions:
1. Check the API documentation
2. Review the logs in `backend/logs/`
3. Ensure all environment variables are set
4. Verify API keys are valid and have proper permissions

## 🚀 Production Deployment

### Environment Variables
Update all environment variables for production:
- Set `DEBUG=false`
- Use strong `SECRET_KEY`
- Configure production database
- Set up proper API keys

### Docker Production
```bash
docker-compose --profile production up -d
```

### Manual Deployment
1. Build frontend: `npm run build:frontend`
2. Start backend: `npm run start:backend`
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Configure monitoring and logging
