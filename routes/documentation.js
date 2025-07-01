const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views/documentation.html'));
});

module.exports = router;