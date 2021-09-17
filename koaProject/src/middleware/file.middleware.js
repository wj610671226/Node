const multer = require('koa-multer');
const path = require('path');
const fs = require('fs');

const {AVATAR_FILE_PATH} = require('../constants/files-path');

// 上传单张图片并且命名
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "upload/avatar/")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});
const avatarUploadHandle = multer({
    storage
}).single('avatar');


/**
 * 递归创建目录
 */
const creatrFilePath = async (ctx, next) => {
    const result = fs.existsSync(AVATAR_FILE_PATH);
    console.log(result);
    if (!result) {
        fs.mkdirSync(AVATAR_FILE_PATH, {recursive: true});
    }
    await next();
}


module.exports = {
    avatarUploadHandle,
    creatrFilePath
}