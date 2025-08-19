#!/bin/bash

# WooCommerce Product Segmenter - Local Setup Script
# This script helps set up the project for local development

echo "🚀 Setting up WooCommerce Product Segmenter locally..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if MongoDB is running (for local setup)
if command -v mongosh &> /dev/null; then
    echo "✅ MongoDB CLI found"
    if mongosh --eval "db.runCommand('ping')" --quiet &> /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is installed but not running. Please start MongoDB service."
    fi
else
    echo "⚠️  MongoDB CLI not found. You can use MongoDB Atlas instead."
fi

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Setup environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your database connection."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Update your .env file with database connection"
echo "2. Start the backend: npm run dev:backend"
echo "3. Start the frontend: npm run dev:frontend"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "For detailed instructions, see README.md or SETUP.md"