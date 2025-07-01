const express = require('express');
const { compareArrays } = require('../src/compareArrays');
const skipWords = require('../data/skipWords.json');
const router = express.Router();

router.post('/', (req, res) => {
  const { rawFollowers, rawFollowing } = req.body;
  
  try {
    const result = compareArrays(rawFollowers, rawFollowing, skipWords);
    res.json(result);
  } catch (error) {
    console.error('Comparison error:', error);
    res.status(500).json({ error: 'Something went wrong during comparison' });
  }
});

module.exports = router;