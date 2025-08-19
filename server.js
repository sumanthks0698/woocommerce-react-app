import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './services/product-service/routes.js';
import segmentRoutes from './services/segment-service/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.static('frontend/build'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/woocommerce-products')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/segments', segmentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'WooCommerce Product Segmenter API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend for any other routes
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './frontend/build' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});