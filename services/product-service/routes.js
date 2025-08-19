import express from 'express';
import { ingestProducts, getAllProducts, getProductById } from './controllers/productController.js';

const router = express.Router();

// POST /api/products/ingest - Ingest products from WooCommerce
router.post('/ingest', ingestProducts);

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', getProductById);

export default router;