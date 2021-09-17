const connection = require('../app/database');

class UserServices {
    async login(name, password) {
        // let result = await connection.execute('select * from user where name = ? and password = ?', [name, password]);
        return true;
    }
}

module.exports = new UserServices();