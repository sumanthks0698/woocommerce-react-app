// 

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log("DB_HOST is:", process.env.DB_HOST);  // ✅ Confirm env is loaded

const express = require('express');
const cors = require('cors');

const { connectDB } = require('./db');  // ✅ Connect to DB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const productsRouter = require('./routes/Products');
app.use('/products', productsRouter);

const PORT = process.env.PORT || 5000;

// Start server after DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Product Service listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB. Server not started.', err);
  });
