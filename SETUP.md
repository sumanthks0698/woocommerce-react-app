# Local Development Setup Guide

## Prerequisites Checklist
- [ ] Node.js v16+ installed
- [ ] MongoDB installed (local) OR MongoDB Atlas account (cloud)
- [ ] Git installed
- [ ] Text editor (VS Code recommended)

## Step-by-Step Setup

### 1. Project Setup
```bash
git clone <your-repo-url>
cd woocommerce-product-segmenter
npm run setup  # Installs all dependencies
```

### 2. Database Setup Options

#### Option A: Local MongoDB
1. Download MongoDB Community Server
2. Install and start the service
3. Use connection string: `mongodb://localhost:27017/woocommerce-products`

#### Option B: MongoDB Atlas (Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Add your IP to network access

### 3. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your database connection
```

### 4. Start Development Servers

**Terminal 1 (Backend):**
```bash
npm run dev:backend
```

**Terminal 2 (Frontend):**
```bash
npm run dev:frontend
```

### 5. Verify Setup
- Backend: http://localhost:3001/api/health
- Frontend: http://localhost:3000
- Test ingestion by clicking "Ingest Products"

## Quick Commands
```bash
# Full setup
npm run setup

# Start backend only
npm run dev:backend

# Start frontend only  
npm run dev:frontend

# Test API
npm run test:api

# View database (MongoDB shell)
mongosh
use woocommerce-products
db.products.find().limit(5)
```

## Need Help?
- Check the main README.md for detailed troubleshooting
- Ensure all prerequisites are installed
- Verify .env configuration
- Check that MongoDB is running