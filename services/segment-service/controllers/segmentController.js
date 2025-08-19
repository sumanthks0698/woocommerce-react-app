import Product from '../../product-service/models/Product.js';
import { parseRules } from '../utils/ruleParser.js';

// Evaluate segment rules
export const evaluateSegment = async (req, res) => {
  try {
    const { rules } = req.body;
    
    if (!rules || typeof rules !== 'string') {
      return res.status(400).json({
        error: 'Rules are required and must be a string',
        example: 'price > 1000\nstock_status = instock\non_sale = true'
      });
    }
    
    console.log('Evaluating rules:', rules);
    
    // Parse rules into MongoDB query
    const query = parseRules(rules.trim());
    
    console.log('Generated query:', JSON.stringify(query, null, 2));
    
    // Execute query
    const products = await Product.find(query).sort({ created_at: -1 });
    
    res.json({
      success: true,
      rules: rules.trim(),
      query: query,
      count: products.length,
      products: products
    });
  } catch (error) {
    console.error('Segment evaluation error:', error);
    res.status(400).json({
      error: 'Failed to evaluate segment',
      details: error.message,
      example: 'price > 1000\nstock_status = instock\non_sale = true'
    });
  }
};