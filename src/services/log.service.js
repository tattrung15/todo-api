require('winston-daily-rotate-file');
const winston = require('winston');
const path = require('path');
const BaseClass = require('../base/base.class');

class _LogService extends BaseClass {
  constructor() {
    super();
    this.consoleLogger = winston.createLogger({
      level: 'info',
      format: this.getLogFormatConfig(),
      transports: [getConsoleTransport()]
    });
    this.fileLogger = winston.createLogger({
      level: 'info',
      format: this.getLogFormatConfig(),
      transports: [getDailyRotateFileTransport('error'), getConsoleTransport()]
    });
  }

  /**
   * Log the `AppError` instance error of a request
   *
   * @param {import('express').Request} req NodeJS Express Request
   * @returns {(status: number, message: string) => void} A file logging function
   */
  logAppErrorRequest(req) {
    return (status, message) => {
      this.fileLogger.error(`${status} | ${message}`, { req });
    };
  }

  /**
   * Log unexpected error of a request
   *
   * @param {import('express').Request} req NodeJS Express Request
   * @returns {(message: string) => void} A file logging function
   */
  logErrorRequest(req) {
    return (message) => {
      this.fileLogger.error(message, { req });
    };
  }

  /**
   * Log error to file
   *
   * @param {string} message
   * @param  {...string} extras
   */
  logErrorFile(message, ...extras) {
    const logStr = [message, ...extras].join(' ');
    this.fileLogger.error(`${logStr}`);
  }

  /**
   * Log info to console
   *
   * @param {string} message
   * @param  {...string} extras
   */
  logInfo(message, ...extras) {
    const logStr = [message, ...extras].join(' ');
    this.consoleLogger.info(`${logStr}`);
  }

  /**
   * Log error to console
   *
   * @param {string} message
   * @param  {...string} extras
   */
  logError(message, ...extras) {
    const logStr = [message, ...extras].join(' ');
    this.consoleLogger.error(`${logStr}`);
  }

  /**
   * Get the meta-config to construct custom logging format config (for winston)
   *
   * @returns The meta-config to construct custom logging format config
   */
  getLogFormatConfig() {
    return winston.format.combine(
      winston.format.timestamp(),
      winston.format.metadata({
        fillExcept: ['timestamp', 'service', 'level', 'message']
      }),
      this.getLogFormat()
    );
  }

  /**
   * Get the config for the custom logging format (for winston)
   *
   * @returns The config for the custom logging format
   */
  getLogFormat() {
    return winston.format.printf(({ timestamp, level, message, metadata }) => {
      let logStr = `${timestamp} | ${level.toUpperCase()}`;
      logStr += ` : ${message}`;

      const { req } = metadata;
      if (req) {
        const { method, originalUrl, headers, params, query, body } = req;
        logStr += `\n  ${method}:${originalUrl}`;
        logStr += `\n    Header: ${JSON.stringify(headers)}`;
        logStr += `\n    Params: ${JSON.stringify(params)}`;
        logStr += `\n    Query: ${JSON.stringify(query)}`;
        logStr += `\n    Body: ${JSON.stringify(body)}`;
      }

      return logStr;
    });
  }
}

/**
 * Get the winston daily-rotate file transport layer
 *
 * @param {'error' | 'info'} level The logging level
 * @returns The winston daily-rotate file transport layer
 */
function getDailyRotateFileTransport(level) {
  return new winston.transports.DailyRotateFile({
    level,
    filename: '%DATE%.log',
    dirname: path.join('logs', level),
    datePattern: 'YYYY-MM-DD'
  });
}

/**
 * Get the winston console transport layer
 */
function getConsoleTransport() {
  return new winston.transports.Console();
}

const LogService = new _LogService();
module.exports = LogService;
