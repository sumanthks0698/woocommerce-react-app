# 🚀 Windows-Specific Vercel Deployment Commands

## 📋 Prerequisites for Windows

### 1. Install Vercel CLI (Windows)
```bash
# Install globally using npm
npm install -g vercel

# OR install using yarn
yarn global add vercel

# Verify installation
vercel --version
```

### 2. If 'vercel' command not recognized:
```bash
# Check npm global path
npm config get prefix

# Add to PATH manually:
# 1. Open Windows Settings → System → About → Advanced system settings
# 2. Click "Environment Variables"
# 3. Under "User variables", find PATH and add:
#    C:\Users\%USERNAME%\AppData\Roaming\npm

# Restart terminal after adding to PATH
```

### 3. Alternative: Use npx (no global install needed)
```bash
# Use npx for each command (recommended for Windows)
npx vercel login
npx vercel --prod
```

---

## 🎯 Simplified Deployment (Web Interface Method)

### Method 1: Vercel Web Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Login with GitHub/GitLab/Bitbucket
3. Click "New Project"
4. Import your Git repository
5. Vercel will auto-detect and deploy

### Method 2: Manual CLI Commands (Windows)
```bash
# Step 1: Install and login
npm install -g vercel
vercel login

# Step 2: Deploy Product Service
cd backend\product-service
npx vercel --prod

# Step 3: Deploy Segment Service
cd ..\segment-service
npx vercel --prod

# Step 4: Deploy Frontend
cd ..\..
npx vercel --prod
```

---

## 🔧 Windows PowerShell Commands

### Using PowerShell (Run as Administrator):
```powershell
# Install Vercel CLI
npm install -g vercel

# Check if installed correctly
Get-Command vercel

# Deploy services
cd "C:\Users\PRAJWAL J\Downloads\ReactProject\backend\product-service"
npx vercel --prod

cd "C:\Users\PRAJWAL J\Downloads\ReactProject\backend\segment-service"
npx vercel --prod

cd "C:\Users\PRAJWAL J\Downloads\ReactProject"
npx vercel --prod
```

---

## 🚀 Quick Start (No CLI Installation)

### Deploy via GitHub (Recommended for Windows):
1. **Create GitHub repository**
2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```
3. **Go to [vercel.com](https://vercel.com)**
4. **Import GitHub repository**
5. **Vercel auto-deploys** with each push

---

## 📱 Alternative: Deploy via ZIP Upload

### Manual Upload Method:
1. **Zip your project folders**:
   - Zip `backend/product-service` separately
   - Zip `backend/segment-service` separately
   - Zip root React project

2. **Upload to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Upload" button
   - Select your zip files

---

## 🎯 One-Command Deployment Script

Create `deploy-windows.bat`:
```batch
@echo off
echo Starting Vercel Deployment...

echo Installing Vercel CLI...
npm install -g vercel

echo Deploying Product Service...
cd backend\product-service
npx vercel --prod

echo Deploying Segment Service...
cd ..\segment-service
npx vercel --prod

echo Deploying Frontend...
cd ..\..
npx vercel --prod

echo Deployment complete! Check Vercel dashboard for URLs.
pause
```

Save as `deploy-windows.bat` and run as Administrator.

---

## ✅ Verification Commands (Windows)

```bash
# Test if Vercel CLI is working
vercel --version

# Test if npx works
npx vercel --version

# Check npm global path
npm config get prefix
```

---

## 🛠️ Troubleshooting Windows Issues

### Issue 1: 'vercel' is not recognized
**Solution**: Use `npx vercel` instead of `vercel`

### Issue 2: Permission denied
**Solution**: Run PowerShell as Administrator

### Issue 3: Path issues
**Solution**: Use full paths in commands:
```bash
npx vercel --cwd="C:\Users\PRAJWAL J\Downloads\ReactProject\backend\product-service"
```

---

## 📞 Emergency Deployment (No CLI)

If all else fails, use **Vercel Web Interface**:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag and drop your project folders
3. Vercel will guide you through deployment

**Estimated time**: 5-10 minutes using web interface
