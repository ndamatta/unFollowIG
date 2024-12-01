const https = require('https');

const keepAlive = () => {
    const options = {
        hostname: 'unfollowig.onrender.com',
        path: '/ping',
        method: 'GET',
    };

    const req = https.request(options, (res) => {
        console.log(`Pinged: ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
};

// Ping every 14 minutes
setInterval(keepAlive, 14 * 60 * 1000);

module.exports = keepAlive;