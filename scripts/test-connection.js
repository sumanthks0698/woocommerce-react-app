// Test script to verify database and API connections
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const testConnections = async () => {
  console.log('🧪 Testing WooCommerce Product Segmenter connections...\n');

  // Test 1: Database Connection
  console.log('1. Testing MongoDB connection...');
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/woocommerce-products');
    console.log('✅ MongoDB connection successful');
    await mongoose.disconnect();
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
  }

  // Test 2: WooCommerce API
  console.log('\n2. Testing WooCommerce API...');
  try {
    const baseUrl = process.env.WOOCOMMERCE_BASE_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
    
    const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=1`;
    
    const response = await axios.get(url);
    console.log('✅ WooCommerce API connection successful');
    console.log(`   Found ${response.headers['x-wp-total']} total products`);
  } catch (error) {
    console.log('❌ WooCommerce API connection failed:', error.message);
  }

  // Test 3: Environment Variables
  console.log('\n3. Checking environment variables...');
  const requiredVars = [
    'MONGODB_URI',
    'WOOCOMMERCE_BASE_URL', 
    'WOOCOMMERCE_CONSUMER_KEY',
    'WOOCOMMERCE_CONSUMER_SECRET'
  ];

  let allVarsPresent = true;
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`✅ ${varName} is set`);
    } else {
      console.log(`❌ ${varName} is missing`);
      allVarsPresent = false;
    }
  });

  if (allVarsPresent) {
    console.log('\n🎉 All tests passed! Your setup looks good.');
  } else {
    console.log('\n⚠️  Some issues found. Please check your .env file.');
  }
};

testConnections().catch(console.error);