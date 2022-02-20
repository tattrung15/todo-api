const express = require('express');
const cors = require('cors');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const AppConfig = require('./app.config');
const TrimString = require('./middlewares/trim-string.middleware');
const routes = require('./app.route');
const AppError = require('./utils/error');

const app = express();
const port = AppConfig.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(TrimString.handle);
app.use('/api', routes);
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  }
  return res.status(500).json({
    status: 500,
    message: INTERNAL_SERVER_ERROR
  });
});

const server = app.listen(port, () => {
  console.log('App listening on port', port);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
