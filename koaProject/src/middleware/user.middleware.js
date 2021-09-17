const errorTypes = require('../constants/error-type');
const userService = require('../service/user.service');
const { applicationLogger } = require('../app/logs-config');

const verifyUser = async (ctx, next) => {
    console.log('verifyUser');
    console.log(ctx.request.body);
    const { name, password } = ctx.request.body;
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }
    await next();
}


const verifyUserId = async (ctx, next) => {
    console.log('verifyUserId');
    console.log(ctx.params);
    const { id } = ctx.params;
    if (!id || id <= 0) {
        const error = new Error(errorTypes.USER_ID_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }
    ctx.uid = id;
    await next();
}

const verifyUserToken = async (ctx, next) => {
    console.log('verifyUserToken');
    const token = ctx.headers.token;
    if (!token) {
        const error = new Error(errorTypes.USER_TOKEN_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }
    ctx.token = token;
    await next();
}

const verifyRegisterUser = async (ctx, next) => {
    applicationLogger.info('verifyUserIsExist');
    const { name, password } = ctx.request.body;
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    try {
        const result = await userService.accountIsExist(name);
        if (result)  {
            return ctx.app.emit('error', new Error(errorTypes.USER_IS_EXIST), ctx);
        }
        await next();
    } catch (err) {
        ctx.app.emit('error', new Error(err), ctx);
    }
}

module.exports = {
    verifyUser,
    verifyUserId,
    verifyUserToken,
    verifyRegisterUser
}