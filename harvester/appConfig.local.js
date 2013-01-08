var config = require('./appConfig').config;
config.databaseHost = 'localhost';
config.databaseName = 'awesome';
config.databasePort = 27017;
config.trackItems = ['beiber', 'britney','belieber'];

module.exports.config = config;
