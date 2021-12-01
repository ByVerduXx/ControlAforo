const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '192.168.187.128',
    user: 'ubicomp',
    password: 'ubicomp',
    database: 'UBICOMP',
    connectionLimit: 20
});

function getTest() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM TEST';
        pool.query(sql).then(rows => {
            resolve(rows);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    getTest
};
