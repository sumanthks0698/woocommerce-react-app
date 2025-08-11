const axios = require('axios');
const pool = require('../db');
require('dotenv').config();

const WC_BASE = process.env.WC_BASE_URL;
const WC_KEY = process.env.WC_KEY;
const WC_SECRET = process.env.WC_SECRET;

async function ingestAll() {
  let page = 1;
  const per_page = 100;
  let total = 0;

  try {
    while (true) {
      const url = `${WC_BASE}/wp-json/wc/v3/products?per_page=${per_page}&page=${page}&consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`;
      
      // ✅ Log the URL being fetched
      console.log('Fetching:', url);

      const resp = await axios.get(url, { timeout: 20000 });
      const products = resp.data;

      if (!Array.isArray(products) || products.length === 0) break;

      for (const p of products) {
        const id = p.id;
        const title = p.name || null;
        const price = (p.price ?? p.regular_price ?? '0').toString();
        const price_num = parseFloat(price) || 0;
        const stock_status = p.stock_status ?? null;
        const stock_quantity = (p.stock_quantity !== undefined && p.stock_quantity !== null) ? Number(p.stock_quantity) : null;
        const category = (p.categories && p.categories.length) ? p.categories[0].name : null;
        const tags = (p.tags || []).map(t => t.name);
        const on_sale = p.on_sale ? 1 : 0;
        const created_at = p.date_created ? new Date(p.date_created) : null;

        const sql = `
          INSERT INTO products
            (id,title,price,price_num,stock_status,stock_quantity,category,tags,on_sale,created_at,ingested_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
          ON DUPLICATE KEY UPDATE
            title=VALUES(title),
            price=VALUES(price),
            price_num=VALUES(price_num),
            stock_status=VALUES(stock_status),
            stock_quantity=VALUES(stock_quantity),
            category=VALUES(category),
            tags=VALUES(tags),
            on_sale=VALUES(on_sale),
            created_at=VALUES(created_at),
            ingested_at=NOW()
        `;

        await pool.query(sql, [
          id,
          title,
          price,
          price_num,
          stock_status,
          stock_quantity,
          category,
          JSON.stringify(tags),
          on_sale,
          created_at
        ]);

        total++;
      }

      page++;
    }

    return { success: true, inserted: total };
  } catch (err) {
    console.error('Ingest error:', err.message);
    throw err;
  }
}

module.exports = { ingestAll };
