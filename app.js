const express = require('express');
const app = express();
const path = require('path');
const keepAlive = require('./public/keepAlive');

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Ping
app.get('/ping', (req, res) => {res.send('pong');});

//Index route
const indexRoute = require('./routes/indexRoute')
app.use('/', indexRoute);

//Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

keepAlive();