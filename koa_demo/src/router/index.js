const fs = require('fs');
const { debugLogger } = require('../app/logs-config');

const useRoutes = function() {
    debugLogger.debug('注册路由');
    fs.readdirSync(__dirname).forEach((item) => {
        if (item.indexOf('route') === -1) return;
        // 注册路由
        debugLogger.debug('注册路由 item = ' + item);
        const router = require(`./${item}`);
        this.use(router.routes());
        this.use(router.allowedMethods());
    });
}
  
module.exports = useRoutes;