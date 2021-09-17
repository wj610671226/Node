const Router = require('koa-router');
const router = new Router();
const { 
    login, 
    getUserInfo, 
    cerateToken, 
    verifyToken,
    register
} = require('../controller/user.controller');

const { 
    verifyUser, 
    verifyUserId,
    verifyUserToken,
    verifyRegisterUser
} = require('../middleware/user.middleware');

router.post('/login', verifyUser, login);
router.post('/register', verifyRegisterUser, register);
router.get('/userInfo/:id', verifyUserId, getUserInfo);

// 生成token
router.get('/createToken', cerateToken);
// 验证token 测试
router.post('/verifyToken', verifyUserToken,  verifyToken);

module.exports = router;