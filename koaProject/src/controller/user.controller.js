const { 
    getUserById,
    resgisterUser
 } = require('../service/user.service');
const callbackBody = require('../utils/utils');
const jwt = require('jsonwebtoken');
const config = require('../app/config');
const md5password = require('../utils/crypto-utils');

class UserController {
    async login(ctx, next) {
        console.log("获取user");
        ctx.body = "login success";
    }

    async register(ctx, next) {
        console.log("register user");
        const {name, password}  = ctx.request.body;
        try {
            const passd = md5password(password);
            await resgisterUser(name, passd);
            ctx.body = callbackBody(0);
        } catch (err) {
            console.log("注册用户失败: " + err);
            ctx.app.emit('error', new Error("注册用户失败"), ctx);
        }
    }

    async getUserInfo(ctx, next) {
        // 这里如果不捕获错误会在app.on('error', errorHandle); 中收到错误
        try {
            const result = await getUserById(ctx.uid);
            ctx.body = callbackBody(0, result);
        } catch (err) {
            console.log("获取用户信息失败: " + err);
            // ctx.body = callbackBody(null, "获取用户信息失败")
            // 发送到errorHandle 统一处理
            ctx.app.emit('error', new Error("获取用户信息失败"), ctx);
        }
    }


    async cerateToken(ctx, next) {
        console.log("cerateToken");
        const token = jwt.sign(
            {userID: 1, userName: '张三' }, 
            config.PRIVATE_KEY, 
            { 
                algorithm: 'RS256',
                // 过期时间秒
                expiresIn: 60 * 60
            }
        );
        ctx.body = callbackBody(0, {token});
    }

    async verifyToken(ctx, next) {
        console.log(`token = `, ctx.token);
        try {
            const result = jwt.verify(ctx.token, config.PUBLIC_KEY, {algorithms: 'RS256'});
            console.log(result);
            ctx.body = "verifyToken success";
        } catch (err) {
            return ctx.app.emit('error', new Error("无效的token"), ctx);
        }
    }
}

module.exports = new UserController();