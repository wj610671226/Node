const app = require('./app');
const config = require('./app/config');
require('./app/database');

app.listen(config.APP_PORT, () => {
    console.log(`创建服务器成功 ${config.APP_PORT}`);
});