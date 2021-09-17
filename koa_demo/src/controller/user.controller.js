const { 
    login
 } = require('../service/user.service');
const callbackBody = require('../utils/utils');
const md5password = require('../utils/crypto-utils');
const { debugLogger } = require('../app/logs-config');

class UserController {
    async login(ctx, next) {
        debugLogger.debug("login");
        try {
            await login("name", "password");
            ctx.body = "login success";
        } catch (error) {
            return ctx.app.emit(new Error(error), ctx);
        }
    }
}

module.exports = new UserController();