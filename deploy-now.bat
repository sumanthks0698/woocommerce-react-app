@echo off
echo ========================================
echo Vercel Deployment Script for Windows
echo ========================================

echo Installing Vercel CLI...
call npm install -g vercel

echo.
echo ========================================
echo Deploying Product Service...
echo ========================================
cd /d "C:\Users\PRAJWAL J\Downloads\ReactProject\backend\product-service"
call npx vercel --prod

echo.
echo ========================================
echo Deploying Segment Service...
echo ========================================
cd /d "C:\Users\PRAJWAL J\Downloads\ReactProject\backend\segment-service"
call npx vercel --prod

echo.
echo ========================================
echo Deploying Frontend...
echo ========================================
cd /d "C:\Users\PRAJWAL J\Downloads\ReactProject"
call npx vercel --prod

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo Check the URLs above for your deployed services
pause
