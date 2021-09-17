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
        case errorTypes.USER_ID_IS_REQUIRED:
            message = "用户ID不能为空";
            break;
        case errorTypes.USER_TOKEN_IS_REQUIRED:
            message = "用户token不能为空";
            break;
        case errorTypes.USER_IS_EXIST:
            message = "用户已经存在";
            break;
        case errorTypes.NO_AVATAR:
            message = "暂无图片";
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