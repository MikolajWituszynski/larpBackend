// server.js
const express = require('express');
const cors = require('cors');
const twitterRoutes = require('./routes/twitter');

const app = express();

app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true
}));

app.use(express.json());
app.use('/api/twitter', twitterRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));