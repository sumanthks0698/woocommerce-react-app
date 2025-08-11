const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('../../product-service/src/db');

const app = express();
app.use(cors());
app.use(express.json());

const segmentsRouter = require('./routes/segments');
app.use('/segments', segmentsRouter);

const PORT = process.env.PORT || 3001;

// Connect to DB, then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Segment Service listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB. Server not started.', err);
  });
