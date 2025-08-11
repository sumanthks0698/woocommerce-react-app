const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all products
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const { id, title, price, stock_status, stock_quantity, category, tags, on_sale } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO products (id, title, price, stock_status, stock_quantity, category, tags, on_sale) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, title, price, stock_status, stock_quantity, category, tags, on_sale]
    );
    res.status(201).json({ message: 'Product created successfully', id });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { title, price, stock_status, stock_quantity, category, tags, on_sale } = req.body;
    const [result] = await pool.execute(
      'UPDATE products SET title = ?, price = ?, stock_status = ?, stock_quantity = ?, category = ?, tags = ?, on_sale = ? WHERE id = ?',
      [title, price, stock_status, stock_quantity, category, tags, on_sale, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
