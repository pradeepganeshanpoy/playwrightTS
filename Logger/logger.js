const { info } = require('console');
const winston = require('winston');

const options =
{
    level: "info",
    transports: [
        new winston.transports.Console({
            level: 'info',
            colorize : false
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'info',
            maxFiles: 1,
            
        })
    ]

};
const logger = winston.createLogger(options);

//By this line we can store our logs in the file forate(.logs) files.
// OR 
// We can display the logs in the console as well.



logger.info("Pradeep Kumar");
logger.warn("M.Sc.It");