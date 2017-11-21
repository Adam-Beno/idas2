import winston from 'winston';
import { isProduction } from 'shared/utils/env';

const transports = [
  new (winston.transports.Console)(),
  new (winston.transports.File)({ filename: 'error.log', level: 'error', name: 'file-error' }),
];

if (!isProduction) {
  transports.push(new (winston.transports.File)({ filename: 'debug.log', level: 'debug', name: 'file-debug' }));
}

const logger = new (winston.Logger)({
  transports,
});

logger.setLevels(winston.config.syslog.levels);

export default logger;
