// requestLogger.js

const fs = require('fs');
const path = require('path');

// Middleware function to log GET requests
const logGETRequests = (req, res, next) => {
    if (req.method === 'GET') {
        // Extract relevant information from the request
        const { method, url, query, params, headers, ip } = req;

        // Construct log message
        const logMessage = `[${new Date().toISOString()}] ${method} ${url}\n` +
            `IP: ${ip}\n` +
            `Query Parameters: ${JSON.stringify(query)}\n` +
            `Route Parameters: ${JSON.stringify(params)}\n` +
            `Headers: ${JSON.stringify(headers)}\n\n`;

        // Write log message to a log file
        const logFilePath = path.join(__dirname, 'request.log');
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }

    // Call the next middleware in the chain
    next();
};

module.exports = logGETRequests;
