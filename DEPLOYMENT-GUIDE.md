# 🚀 Complete Deployment Guide: React + Node.js to Vercel

## 📋 Project Overview
- **Frontend**: React (Vite) - Port 5173
- **Backend**: Two Node.js services
  - Product Service: Port 5000
  - Segment Service: Port 3002
- **Database**: MySQL

## 🎯 Deployment Strategy

### Phase 1: Deploy Backend Services
### Phase 2: Deploy Frontend
### Phase 3: Configure Environment Variables

---

## 🔧 Phase 1: Deploy Backend Services

### Option A: Deploy to Vercel (Recommended)

#### 1.1 Deploy Product Service
```bash
cd backend/product-service
npm install
```

Create `.env` file in `backend/product-service/`:
```env
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=your-database-name
DB_PORT=3306
PORT=5000
```

Deploy to Vercel:
```bash
cd backend/product-service
npx vercel --prod
```

#### 1.2 Deploy Segment Service
```bash
cd backend/segment-service
npm install
```

Create `.env` file in `backend/segment-service/`:
```env
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=your-database-name
DB_PORT=3306
PORT=3002
```

Deploy to Vercel:
```bash
cd backend/segment-service
npx vercel --prod
```

### Option B: Deploy to Railway (Alternative)
Railway provides better MySQL integration:
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add MySQL service
4. Deploy backend services

---

## 🎨 Phase 2: Deploy Frontend

### 2.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 2.2 Deploy React App
```bash
# From root directory
npx vercel --prod
```

### 2.3 Configure Environment Variables
After deployment, set these in Vercel dashboard:

**Frontend Environment Variables:**
- `VITE_API_URL`: Your deployed product service URL
- `VITE_SEGMENT_API_URL`: Your deployed segment service URL

Example:
```
VITE_API_URL=https://product-service-xyz.vercel.app
VITE_SEGMENT_API_URL=https://segment-service-abc.vercel.app
```

---

## 🗄️ Database Setup for Production

### Option 1: PlanetScale (Recommended)
1. Go to [planetscale.com](https://planetscale.com)
2. Create free MySQL database
3. Update connection strings in backend `.env` files

### Option 2: Railway MySQL
1. Use Railway's built-in MySQL service
2. Update connection strings

### Option 3: AWS RDS
1. Create AWS RDS MySQL instance
2. Configure security groups
3. Update connection strings

---

## 🔗 Complete Deployment Commands

### Step 1: Deploy Product Service
```bash
cd backend/product-service
# Install dependencies
npm install

# Deploy to Vercel
npx vercel --prod
# Note the deployed URL: https://product-service-xxx.vercel.app
```

### Step 2: Deploy Segment Service
```bash
cd backend/segment-service
# Install dependencies
npm install

# Deploy to Vercel
npx vercel --prod
# Note the deployed URL: https://segment-service-xxx.vercel.app
```

### Step 3: Deploy Frontend
```bash
# From root directory
npx vercel --prod

# When prompted, set environment variables:
VITE_API_URL=https://product-service-xxx.vercel.app
VITE_SEGMENT_API_URL=https://segment-service-xxx.vercel.app
```

---

## ✅ Verification Steps

### 1. Test Backend APIs
```bash
# Test product service
curl https://product-service-xxx.vercel.app/products

# Test segment service
curl -X POST https://segment-service-xxx.vercel.app/segments/evaluate \
  -H "Content-Type: application/json" \
  -d '{"conditions": "price > 100"}'
```

### 2. Test Frontend
Visit your deployed frontend URL and verify:
- Products load correctly
- Segment evaluation works
- No CORS errors

---

## 🛠️ Troubleshooting

### CORS Issues
Add this to your backend services:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Database Connection Issues
1. Ensure MySQL host allows external connections
2. Check firewall settings
3. Verify credentials

### Environment Variables
Make sure all environment variables are set in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add all required variables

---

## 📊 Monitoring

### Vercel Analytics
1. Enable Vercel Analytics in dashboard
2. Monitor performance metrics

### Database Monitoring
- Use PlanetScale dashboard
- Monitor query performance

---

## 🎯 Quick Start Commands

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy backend services
cd backend/product-service && vercel --prod
cd backend/segment-service && vercel --prod

# 4. Deploy frontend
cd ../.. && vercel --prod

# 5. Set environment variables in Vercel dashboard
```

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify database connections
3. Ensure all environment variables are set
4. Check CORS configuration

**Estimated Time**: 15-30 minutes
**Cost**: Free tier on Vercel covers most use cases
