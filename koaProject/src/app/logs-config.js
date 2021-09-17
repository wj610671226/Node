const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
    appenders: {
        out: { type: "console" },
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', //生成文件的规则
            alwaysIncludePattern: true, //文件名始终以日期区分
            encoding:"utf-8",
            filename: path.join('logs/', 'access.log') //生成文件名
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', 
            alwaysIncludePattern: true,
            encoding:"utf-8",
            filename: path.join('logs/', 'application.log')
        },
    },
    categories: {
        default: { appenders: ['out'], level: 'debug' },
        access: { appenders: ['access'], level: 'info' },
        application: { appenders: ['application'], level: 'info' }
    }
});

// 记录所有访问级别的日志
const accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); 
// 控制台输出
const debugLogger = log4js.getLogger('out');  
// 记录所有应用级别的日志
const applicationLogger = log4js.getLogger('application');  

module.exports = {
    accessLogger,
    applicationLogger,
    debugLogger
};