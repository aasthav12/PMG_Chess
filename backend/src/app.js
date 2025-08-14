const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectToMongo } = require('./db/memory');
const authRoutes = require('./routes/auth');
const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth/', authRoutes);

connectToMongo()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Failed to start server:', e);
    process.exit(1);
  });

module.exports = app;