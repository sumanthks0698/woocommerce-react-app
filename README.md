# WooCommerce Product Segmentation Application

A full-stack application that integrates with WooCommerce's REST API to ingest product data, store it locally, and provide advanced filtering capabilities through a text-based rule editor.

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - **Option A**: [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Local installation)
  - **Option B**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free cloud database)
- **Git** - [Download here](https://git-scm.com/)

### 1. Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd woocommerce-product-segmenter

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Server from https://www.mongodb.com/try/download/community
# Start MongoDB service

# On Windows:
net start MongoDB

# On macOS (with Homebrew):
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

### 3. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your settings
nano .env  # or use any text editor
```

**Update your `.env` file:**
```env
# Database Configuration
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/woocommerce-products

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/woocommerce-products

# WooCommerce API Configuration (Pre-configured test credentials)
WOOCOMMERCE_BASE_URL=https://wp-multisite.convertcart.com
WOOCOMMERCE_CONSUMER_KEY=ck_af82ae325fbee1c13f31eb26148f4dea473b0f77
WOOCOMMERCE_CONSUMER_SECRET=cs_2d8cc467c5b91a80f5ed18dd3c282ee8299c9445

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 4. Start the Application

#### Terminal 1 - Backend Server
```bash
# From project root
npm run dev
```
You should see:
```
Server running on port 3001
Connected to MongoDB
```

#### Terminal 2 - Frontend Development Server
```bash
# Open new terminal, navigate to frontend folder
cd frontend
npm start
```
You should see:
```
Local:            http://localhost:3000
```

### 5. Test the Application
1. Open your browser to `http://localhost:3000`
2. Click "Ingest Products" to fetch data from WooCommerce
3. Try the segment editor with rules like:
   ```
   price > 1000
   stock_status = instock
   on_sale = true
   ```

### 6. API Testing (Optional)
Test the backend APIs directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Get all products
curl http://localhost:3001/api/products

# Ingest products
curl -X POST http://localhost:3001/api/products/ingest

# Evaluate segment
curl -X POST http://localhost:3001/api/segments/evaluate \
  -H "Content-Type: application/json" \
  -d '{"rules": "price > 1000\nstock_status = instock"}'
```

## 🔧 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
- Local: Start MongoDB service
- Atlas: Check connection string and network access

**2. Port Already in Use**
```
Error: listen EADDRINUSE :::3001
```
**Solution**: Kill the process or change port
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change PORT in .env file
PORT=3002
```

**3. WooCommerce API Error**
```
Error: Request failed with status code 401
```
**Solution**: Check your WooCommerce credentials in `.env`

**4. Frontend Can't Connect to Backend**
```
Network Error
```
**Solution**: Ensure backend is running on port 3001 and CORS is configured

### Development Tips

**View Database Contents:**
```bash
# Connect to MongoDB shell
mongosh

# Switch to your database
use woocommerce-products

# View products
db.products.find().limit(5)

# Count products
db.products.countDocuments()
```

**Reset Database:**
```bash
# In MongoDB shell
db.products.deleteMany({})
```

**View Logs:**
- Backend logs appear in Terminal 1
- Frontend logs appear in browser console (F12)

## 🚀 Live Demo

- **Frontend**: [Coming Soon - Will be deployed]
- **Backend API**: [Coming Soon - Will be deployed]

## ✨ Features

- **WooCommerce Integration**: Seamless product data ingestion from WooCommerce REST API
- **Local Database Storage**: Efficient storage with MongoDB using exact field mappings
- **Text-based Rule Editor**: Intuitive filtering with operators (=, !=, >, <, >=, <=)
- **Microservices Architecture**: Separate services for products and segment evaluation
- **Responsive UI**: Modern React interface with beautiful product cards
- **Real-time Filtering**: Instant segment evaluation with JSON results display

## 🏗️ Architecture

```
├── services/
│   ├── product-service/     # Product ingestion and retrieval
│   ├── segment-service/     # Rule parsing and evaluation
└── frontend/               # React UI application
```

## 📦 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Axios, Lucide React Icons
- **Database**: MongoDB
- **Deployment**: Ready for Vercel/Railway/Render

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd woocommerce-product-segmenter
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Update the `.env` file with your configurations:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/woocommerce-products

# WooCommerce API Configuration (Pre-configured test credentials)
WOOCOMMERCE_BASE_URL=https://wp-multisite.convertcart.com
WOOCOMMERCE_CONSUMER_KEY=ck_af82ae325fbee1c13f31eb26148f4dea473b0f77
WOOCOMMERCE_CONSUMER_SECRET=cs_2d8cc467c5b91a80f5ed18dd3c282ee8299c9445

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Backend Setup
```bash
# Install dependencies
npm install

# Start the backend server
npm run dev
```

The backend will be available at `http://localhost:3001`

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 📊 Data Ingestion Logic

The application fetches products from WooCommerce using the REST API and maps them to the following schema:

| Field Name | WooCommerce Field | Type | Notes |
|------------|------------------|------|--------|
| id | id | Number | Product ID |
| title | name | String | Product title |
| price | price | Number | Converted from string |
| stock_status | stock_status | String | instock/outofstock/onbackorder |
| stock_quantity | stock_quantity | Number/null | Can be null |
| category | categories[0].name | String | First category name |
| tags | tags[].name | Array | Array of tag names |
| on_sale | on_sale | Boolean | Sale status |
| created_at | date_created | String | ISO string |

## 🎯 Sample Segmentation Rules

```
price > 1000
stock_status = instock
on_sale = true
category = Smartphones
stock_quantity >= 10
tags = premium
```

### Supported Operators
- `=` - Equal to
- `!=` - Not equal to
- `>` - Greater than
- `<` - Less than  
- `>=` - Greater than or equal to
- `<=` - Less than or equal to

## 🔌 API Endpoints

### Product Service
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products/ingest` - Ingest products from WooCommerce

### Segment Service  
- `POST /api/segments/evaluate` - Evaluate filter rules

### Example API Usage
```javascript
// Ingest products
POST /api/products/ingest
Response: { "success": true, "count": 150, "message": "Successfully ingested 150 products" }

// Evaluate segment
POST /api/segments/evaluate
Body: { "rules": "price > 1000\nstock_status = instock" }
Response: { "success": true, "count": 25, "products": [...] }
```

## 🚀 Deployment

The application is configured for deployment on multiple platforms:

### Vercel (Frontend + Serverless Functions)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Railway (Full-stack with database)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

### Docker (Optional)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤖 AI Usage Notes

This project was developed with assistance from AI tools to accelerate development while maintaining code quality:

### ChatGPT/Claude Assistance:
- **Generated**: Initial Express.js server boilerplate and MongoDB schema definitions
- **Generated**: React component structure and basic styling
- **Generated**: WooCommerce API integration example code
- **Modified**: Added custom rule parsing logic and validation
- **Modified**: Enhanced error handling and user experience
- **Modified**: Implemented custom MongoDB query generation for rule evaluation

### GitHub Copilot:
- **Generated**: Boilerplate API route handlers and middleware setup
- **Generated**: Frontend form components and state management
- **Modified**: Added custom business logic for product filtering
- **Modified**: Enhanced UI components with proper accessibility

### Custom Development:
- Rule parser logic for converting text rules to MongoDB queries
- Advanced error handling and validation
- Custom MongoDB aggregation for complex filtering
- Responsive UI design and user experience optimization
- Production-ready deployment configuration

All AI-generated code was thoroughly reviewed, tested, and customized to meet the specific requirements of this application.

## 📁 Project Structure

```
woocommerce-product-segmenter/
├── services/
│   ├── product-service/
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   ├── models/
│   │   │   └── Product.js
│   │   └── routes.js
│   └── segment-service/
│       ├── controllers/
│       │   └── segmentController.js
│       ├── utils/
│       │   └── ruleParser.js
│       └── routes.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductGrid.js
│   │   │   └── SegmentEditor.js
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server.js
├── package.json
├── .env.example
└── README.md
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Product ingestion from WooCommerce API
- [ ] Product display in frontend
- [ ] Rule parsing for different operators
- [ ] MongoDB query generation
- [ ] Error handling for invalid rules
- [ ] Responsive design on mobile/desktop

### Future Enhancements
- Unit tests with Jest
- Integration tests for API endpoints
- E2E tests with Cypress
- Performance monitoring
- Caching layer for better performance

## 📄 License

MIT License - Feel free to use this project as a reference or starting point for your own applications.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using modern web technologies and AI assistance for rapid development.