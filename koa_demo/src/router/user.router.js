const Router = require('koa-router');
const router = new Router();
const { 
    login, 
} = require('../controller/user.controller');

const { 
    verifyUser, 
} = require('../middleware/user.middleware');

router.post('/login', verifyUser, login);

module.exports = router;