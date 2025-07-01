const https = require('https');

/**
 * Starts a periodic "keep alive" ping to a specified URL.
 *
 * This helps keep your deployed app awake by sending HTTP GET requests
 * at a regular interval, preventing it from idling in free-tier hosting.
 *
 * @param {string} url - The full URL to ping (e.g. 'https://test.com/').
 * @param {number} [intervalMs=600000] - Interval between pings in milliseconds (default 10 minutes).
 * @returns {NodeJS.Timeout} The interval timer object, can be cleared to stop pinging.
 */
function startKeepAlive(url, intervalMs = 600000) {
  // Internal function to send a GET request to the URL
  function ping() {
    https.get(url, (res) => {
      console.log(`Pinged ${url} - Status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`Ping error: ${err.message}`);
    });
  }

  ping(); // Immediate first ping on start
  return setInterval(ping, intervalMs); // Schedule repeated pings
}

module.exports =  startKeepAlive;
