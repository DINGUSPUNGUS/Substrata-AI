# Substrata.AI - Conservation Platform 🌱

A streamlined platform for conservation organizations to manage field work, track projects, and coordinate stakeholders.

## 🚀 Quick Start

**Live API**: https://hyphae-ftndmad04-hyphae.vercel.app

### Local Development

**API**:
```bash
cd api
pip install -r requirements.txt
uvicorn index:app --reload
```

**Frontend**:
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
substrata-clean/
├── api/                    # FastAPI backend
│   ├── index.py           # Main API with all endpoints
│   ├── requirements.txt   # Python dependencies
│   └── vercel.json       # Deployment configuration
├── frontend/              # React dashboard
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── package.json      # Node dependencies
├── docs/                 # Documentation
└── README.md            # This file
```

## 🛠️ Features

- **Field Surveys**: Wildlife tracking and environmental data collection
- **Projects**: Conservation project management and timeline tracking
- **Stakeholders**: Partner, donor, and volunteer relationship management
- **Grants**: Funding application and status tracking
- **Analytics**: Data visualization and progress reporting

## 🔗 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/docs` | Interactive API documentation |
| `/health` | Health check |
| `/field-surveys` | Wildlife survey management |
| `/projects` | Conservation project tracking |
| `/stakeholders` | Contact management |
| `/grants` | Grant application tracking |
| `/analytics/*` | Data analytics and reports |

## 🌍 Built for Conservation

Designed specifically for:
- Wildlife conservation organizations
- Environmental NGOs
- Research institutions
- National parks and protected areas
- Conservation funding organizations

## 📝 License

MIT License - Built for the conservation community
