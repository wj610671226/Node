const Router = require('koa-router');
const router = new Router({prefix: '/upload'});
const { 
    uploadAvatar,
    showAvatar,
    showPic
} = require('../controller/file.controller');
const { 
    avatarUploadHandle,
    creatrFilePath
 } = require('../middleware/file.middleware');

 // 上传头像
router.post('/avatar', creatrFilePath, avatarUploadHandle, uploadAvatar);

// 测试展示头像
router.get('/showAvatar', creatrFilePath, showAvatar);

// 获取指定大小的图片
router.get('/showPic', creatrFilePath, showPic);

module.exports = router;