import axios from 'axios';
import Product from '../models/Product.js';

// Ingest products from WooCommerce
export const ingestProducts = async (req, res) => {
  try {
    const baseUrl = process.env.WOOCOMMERCE_BASE_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
    
    console.log('Starting product ingestion...');
    
    // Clear existing products
    await Product.deleteMany({});
    
    let page = 1;
    let totalProducts = 0;
    
    while (true) {
      const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&page=${page}&per_page=100`;
      
      const response = await axios.get(url);
      const products = response.data;
      
      if (!products || products.length === 0) {
        break;
      }
      
      // Transform and save products
      const transformedProducts = products.map(product => ({
        id: product.id,
        title: product.name,
        price: parseFloat(product.price) || 0,
        stock_status: product.stock_status,
        stock_quantity: product.stock_quantity ? parseInt(product.stock_quantity) : null,
        category: product.categories && product.categories.length > 0 ? product.categories[0].name : '',
        tags: product.tags ? product.tags.map(tag => tag.name) : [],
        on_sale: product.on_sale,
        created_at: product.date_created
      }));
      
      await Product.insertMany(transformedProducts);
      totalProducts += transformedProducts.length;
      
      console.log(`Ingested page ${page}: ${transformedProducts.length} products`);
      page++;
    }
    
    res.json({
      success: true,
      message: `Successfully ingested ${totalProducts} products`,
      count: totalProducts
    });
  } catch (error) {
    console.error('Ingestion error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to ingest products',
      details: error.message
    });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ created_at: -1 });
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch products',
      details: error.message
    });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch product',
      details: error.message
    });
  }
};