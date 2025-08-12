# Nyay Sarthi - AI-Powered Legal Assistance Platform

A comprehensive legal assistance platform that combines AI-powered document analysis, precedent finding, and legal research tools.

## 🏗️ Project Structure

```
nyay-sarthi/
├── frontend/                 # React + TypeScript frontend
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── Dockerfile           # Frontend container
├── backend/                 # FastAPI + Python backend
│   ├── app/                 # Application code
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration & utilities
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container
├── docker-compose.yml      # Multi-container setup
└── package.json            # Root project management
```

## 🚀 Quick Start

### Prerequisites


### Development Setup

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

### Individual Services

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

### Docker Setup

**Start all services:**
```bash
npm run docker:dev
```

**Build containers:**
```bash
npm run docker:build
```

## 🛠️ Available Scripts

### Root Level Commands

### Frontend Commands

### Backend Commands

## 🔧 Configuration

### Environment Variables

Create `.env` files in the respective directories:

**Backend (.env):**
```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./data/nyay_sarthi.db
OPENAI_API_KEY=your-openai-api-key
REDIS_URL=redis://localhost:6379
```

**Frontend (.env):**
```env
VITE_BACKEND_URL=http://localhost:8000
```

## 📁 Key Features

### Frontend

### Backend

### AI Features

## 🔐 Authentication

The platform supports two user roles:

### Demo Credentials

## 🐳 Docker Services

The Docker Compose setup includes:

## 📊 Database

The application uses SQLite for development and can be configured for PostgreSQL in production. Database migrations are handled by Alembic.

## 🔍 API Documentation

Once the backend is running, visit:

## 🧪 Testing

**Backend tests:**
```bash
cd backend
pytest
```

**Frontend tests:**
```bash
cd frontend
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions, please open an issue on GitHub or contact the development team.
