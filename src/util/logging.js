const Logger = require('winston');

// Configure logger settings
Logger.remove(Logger.transports.Console);
Logger.add(Logger.transports.Console, {
  colorize: true,
});
Logger.level = 'debug';

module.exports = { Logger };
