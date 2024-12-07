// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./config/logger'); // Custom Winston logger
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('./middlewares/loggingMiddleware'); // Morgan for HTTP logging
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const {
  VERSION,
  PORT,
  NODE_ENV,
  CLIENT_URL,
  APP_NAME,
} = require('./config/envConfig'); // Include NODE_ENV for environment logging
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const checkInRoutes = require('./routes/checkIn.routes');
const { sendDailyCheckinReminder } = require('./services/emailService');
const User = require('./models/user.model');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB()
  .then(() => {
    logger.info('Database connected successfully'.green.bold);
  })
  .catch((error) => {
    logger.error('Database connection failed'.red.bold, error.message);
    process.exit(1); // Exit process on DB connection failure
  });

// Middlewares
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser());
// app.use(cors()); // Allow cross-origin requests, customize for production
// app.use(rateLimiter); // Enable rate limiting to prevent abuse
app.use(morgan); // HTTP request logger using Morgan

const corsOptions = {
  origin: NODE_ENV === 'production' ? CLIENT_URL : 'http://localhost:8000',
  credentials: true,
};
console.log('%c Line:51 🌮 CLIENT_URL', 'color:#42b983', CLIENT_URL);
app.use(cors(corsOptions));

// Log that the middlewares have been successfully loaded
logger.info('Middlewares loaded successfully'.green.bold);

// Routes
app.get('/', (req, res) => {
  res.send({
    success: true,
    message: `Welcome to ${APP_NAME}'s API`,
  });
});

//API Routes
app.use(`/api/${VERSION}/auth`, authRoutes);
app.use(`/api/${VERSION}/user`, userRoutes);
app.use(`/api/${VERSION}/check-in`, checkInRoutes);

// Log that the routes have been registered
logger.info('Routes registered successfully'.green.bold);

// Error handling middleware (should be after all routes)
app.use(errorHandler);

app.use((req, res, next) => {
  console.log('Incoming request:', req.headers);
  next();
});

// Catch any unhandled routes and return a 404
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// 0 8 * * *
cron.schedule('0 8 * * *', async () => {
  try {
    const users = await User.find({ 'preferences.notifications': true });
    console.log('%c Line:75 🍷 users', 'color:#b03734', users);
    for (const user of users) {
      await sendDailyCheckinReminder(user);
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

// Start the server
const server = app.listen(PORT, () => {
  logger.info(
    `Server running in ${NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold
  );
});

// Graceful shutdown for SIGINT and SIGTERM
const shutdown = () => {
  logger.info('Gracefully shutting down...'.red.bold);
  server.close(() => {
    logger.info('Closed out remaining connections.'.red.bold);
    process.exit(0); // Exit when all connections are closed
  });

  // Force exit if it takes too long
  setTimeout(() => {
    logger.error('Forcefully shutting down due to timeout.'.red.bold);
    process.exit(1);
  }, 60000); // 60 seconds timeout
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
