require('dotenv').config();
const fs = require('fs');
const path = require('path');

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'));

// 根目录下.env配置如下键值对
module.exports = {
    APP_PORT,
    DB_HOET,
    DB_USER,
    DB_NAME,
    DB_PASSWORD
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;