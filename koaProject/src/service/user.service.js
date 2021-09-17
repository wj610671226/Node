const connection = require('../app/database');

class UserServices {
    async getUserById(id) {
        let result = await connection.execute('select * from user where id = ?', [id]);
        return result[0];
    }

    async resgisterUser(userName, password) {
        const [result] = await connection.execute('insert into user(name, password) values(?,?)', [userName, password]);
        console.log(result);
        return result;
    }

    async accountIsExist(name) {
        const [result] = await connection.execute('select * from user where name = ?', [name]);
        return (result[0] !== undefined ? true : false);
    }
}

module.exports = new UserServices();