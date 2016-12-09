var winston = require("winston");
var config = require("../config");

//��� ���� ������ ������ ��� � ��������, � �� ������ �� VM
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (require('winston-daily-rotate-file'))({
            datePattern: 'yyyy-MM-dd.log',
            filename: __dirname + "/../public/app"
        })
    ]
});
if (config.get('NODE_ENV') === 'development') {
    logger.transports.console.level = 'debug';
}
module.exports = logger;
