const express = require('express');
const axios = require('axios');
const { parseRules } = require('../utils/parser');

const router = express.Router();
const PRODUCT_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5000';

function matchCondition(product, cond) {
  const { field, op, value } = cond;
  let left = product[field];

  // normalize left values where needed
  if (field === 'price') {
    left = (product.price_num !== undefined && product.price_num !== null) ? Number(product.price_num) : parseFloat(product.price || '0');
  } else if (field === 'stock_quantity') {
    left = product.stock_quantity !== null ? Number(product.stock_quantity) : null;
  } else if (field === 'id') {
    left = Number(product.id);
  } else if (field === 'on_sale') {
    left = !!product.on_sale;
  } else if (field === 'created_at') {
    left = product.created_at ? new Date(product.created_at) : null;
  } else if (field === 'tags') {
    left = product.tags || [];
  } else {
    // ensure string for string comparison
    left = left !== null && left !== undefined ? String(left) : '';
  }

  const v = value;

  // numeric comparisons
  if (op === '>' || op === '>=' || op === '<' || op === '<=') {
    const ln = (left === null || left === '' ? NaN : Number(left));
    const vn = Number(v);
    if (isNaN(ln) || isNaN(vn)) return false;
    if (op === '>') return ln > vn;
    if (op === '>=') return ln >= vn;
    if (op === '<') return ln < vn;
    if (op === '<=') return ln <= vn;
  }

  if (op === '=' || op === '==') {
    if (Array.isArray(left)) {
      return left.some(x => String(x).toLowerCase() === String(v).toLowerCase());
    }
    if (typeof left === 'boolean') return left === Boolean(v);
    return String(left).toLowerCase() === String(v).toString().toLowerCase();
  }

  if (op === '!=') {
    if (Array.isArray(left)) {
      return !left.some(x => String(x).toLowerCase() === String(v).toLowerCase());
    }
    if (typeof left === 'boolean') return left !== Boolean(v);
    return String(left).toLowerCase() !== String(v).toString().toLowerCase();
  }

  if (op === 'contains') {
    if (Array.isArray(left)) {
      return left.some(x => String(x).toLowerCase().includes(String(v).toLowerCase()));
    }
    return String(left).toLowerCase().includes(String(v).toLowerCase());
  }

  return false;
}

router.post('/evaluate', async (req, res) => {
  const raw = req.body.conditions || req.body.rules || '';
  if (!raw || !raw.trim()) return res.status(400).json({ error: 'No rules provided in "conditions" or "rules" field' });

  const parsed = parseRules(raw);
  if (parsed.error) return res.status(400).json({ error: parsed.error });

  try {
    const resp = await axios.get(`${PRODUCT_URL}/products`);
    const products = resp.data;

    const filtered = products.filter(p => {
      return parsed.conditions.every(cond => matchCondition(p, cond));
    });

    res.json({ count: filtered.length, results: filtered });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: 'Failed to fetch products from Product Service' });
  }
});

module.exports = router;
