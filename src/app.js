const express = require('express');
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Check env
if (process.env.NODE_ENV === 'production') {
    console.log("Running in production mode");
} else {
    console.log("Running in development mode");
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
