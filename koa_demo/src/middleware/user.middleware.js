const { debugLogger } = require('../app/logs-config');

const verifyUser = async (ctx, next) => {
    debugLogger.debug('verifyUser');
    await next();
}

module.exports = {
    verifyUser,
}