// middlewares/loggingMiddleware.js
const morgan = require('morgan');
const logger = require('../config/logger'); // Winston for logging

module.exports = morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()), // Send morgan logs to Winston logger
    }
});