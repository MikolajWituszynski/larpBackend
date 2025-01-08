// routes/twitter.js
const express = require('express');
const TwitterService = require('../services/twitter');
const router = express.Router();

const twitterService = new TwitterService();

router.get('/analyze/:handle', async (req, res) => {
  try {
    const data = await twitterService.analyzeHandle(req.params.handle);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;