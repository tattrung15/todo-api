const express = require('express');
const cors = require('cors');
const AppConfig = require('./app.config');
const TrimString = require('./middlewares/trim-string.middleware');
const routes = require('./app.route');
const {
  AppError,
  handleAppError,
  handleError
} = require('./utils/helpers/error.helper');
const LogService = require('./services/log.service');

const app = express();
const port = AppConfig.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(TrimString.handle);
app.use('/api', routes);
app.use((instance, req, res, next) => {
  const { error } = instance;
  if (error instanceof AppError) {
    handleAppError(req, res)(error);
  } else {
    handleError(req, res)(error);
  }
});

const server = app.listen(port, () => {
  LogService.logInfo('App listening on port', port);
});

process.on('SIGTERM', () => {
  LogService.logInfo('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    LogService.logInfo('HTTP server closed');
  });
});
