const path = require('path');

const getIndexPage = async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
};

module.exports = { getIndexPage };