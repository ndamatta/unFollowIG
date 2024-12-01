const express = require('express');
const app = express();
const path = require('path');

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Index route
const indexRoute = require('./routes/indexRoute')
app.use('/', indexRoute);

//Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));