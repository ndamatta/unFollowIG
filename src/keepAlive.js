const https = require('https');

/**
 * Sends a ping to a URL every X milliseconds to keep it alive.
 *
 * @param {string} url - The URL to ping (e.g. 'https://example.com/').
 * @param {number} [intervalMs=600000] - Interval in milliseconds (default 10 minutes).
 * @returns {NodeJS.Timeout} - The interval timer.
 */
function startKeepAlive(url, intervalMs = 600000) {
  function ping() {
    https.get(url, (res) => {
      console.log(`Pinged ${url} - Status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`Ping error: ${err.message}`);
    });
  }

  ping();
  return setInterval(ping, intervalMs);
}

module.exports = startKeepAlive;
