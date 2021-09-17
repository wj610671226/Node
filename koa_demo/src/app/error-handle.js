const errorTypes = require('../constants/error-type');
const callbackBody = require('../utils/utils');
const { applicationLogger, debugLogger } = require('../app/logs-config');

const errorHandle = (error, ctx) => {
    let status = 200;
    let message = "";
    debugLogger.debug('errorHandle message = ' + error.message);
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            message = "用户名或者密码不能为空";
            break;
        default:
            // 处理转发过来的错误
            message = error.message;
    }
    applicationLogger.error('errorHandle message = ' + message);
    ctx.status = status;
    ctx.body = callbackBody(-1, null, message);
}

module.exports = errorHandle;