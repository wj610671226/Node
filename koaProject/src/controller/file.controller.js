const { debugLogger } = require('../app/logs-config');
const fs = require('fs');
const path = require('path');
const { AVATAR_FILE_PATH } = require('../constants/files-path');
const errorTypes = require('../constants/error-type');
const Jimp = require('jimp');

class FileController {
    async uploadAvatar(ctx, next) {
        debugLogger.debug("uploadFile");
        // 打印上传文件信息
        debugLogger.debug(ctx.req.file);
        ctx.body = "uploadFile success;"
    }

    async showAvatar(ctx, next) {
        debugLogger.debug('showAvatar');
        const picArray = fs.readdirSync(AVATAR_FILE_PATH);
        if (picArray.length == 0) {
            return ctx.app.emit('error', new Error(errorTypes.NO_AVATAR), ctx);
        }
        // 取第一张图片
        const picName = picArray[0];
        const avatarPath = `${AVATAR_FILE_PATH}${picName}`;
        debugLogger.debug(`avatarPath = ${avatarPath}`);
        // 暂时写固定值
        ctx.set('Content-Type', 'image/png');
        ctx.body = fs.createReadStream(avatarPath);
    }

    async showPic(ctx, next) {
        debugLogger.debug(ctx.request.query);
        // size = 20y20
        const { size } = ctx.request.query;
        debugLogger.debug(`size = ${size}`);

        // 获取图片数据
        const picArray = fs.readdirSync(AVATAR_FILE_PATH);
        if (picArray.length == 0) {
            return ctx.app.emit('error', new Error(errorTypes.NO_AVATAR), ctx);
        }
        // 取第一张图片
        const picName = picArray[0];
        const avatarPath = `${AVATAR_FILE_PATH}${picName}`;
        ctx.set('Content-Type', 'image/png');

        if (!size) {
            // 原有尺寸返回
            ctx.body = fs.createReadStream(avatarPath);
            return;
        }
        if (size.indexOf('y') === -1) {
            ctx.body = fs.createReadStream(avatarPath);
            return;
        }
        const [width, height] = size.split("y");
        const widthNumber = parseInt(width);
        const heightNumber = parseInt(height);
        if (widthNumber <= 0 || heightNumber <= 0) {
            ctx.body = fs.createReadStream(avatarPath);
            return;
        }
        
        try {
            const lenna = await Jimp.read(avatarPath);
            const buf = await lenna.resize(widthNumber, heightNumber).getBufferAsync('image/png')
            ctx.body = buf;
        } catch(error) {
            return ctx.app.emit('error', new Error(error), ctx);
        }
    }
}

module.exports = new FileController();
