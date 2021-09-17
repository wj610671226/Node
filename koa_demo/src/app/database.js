const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool({
    host: config.DB_HOET,
    user: config.DB_USER,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    // rowsAsArray: true
});

pool.getConnection(function(err, conn) {
    if (err) {
        console.log(`连接数据库失败 error = `, err);
    } else {
        console.log(`连接数据库成功`);
    }
 });

 module.exports = pool.promise();