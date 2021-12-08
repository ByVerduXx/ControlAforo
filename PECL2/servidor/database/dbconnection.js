const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '192.168.187.128',
    user: 'ubicomp',
    password: 'ubicomp',
    database: 'controlaforo',
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

function getUserIdFromUserName(userName) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id_usuario FROM usuarios WHERE username = ?';
        pool.query(sql, [userName]).then(rows => {
            if (rows.length > 0) {
                resolve(rows[0].id_usuario);
            } else {
                reject('No existe el usuario');
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function insertUser(id_usuario, username, password, dni, email, telefono, nombre, direccion) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO usuarios (id_usuario, username, contrasena, dni, email, telefono, nombre_completo, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        pool.query(sql, [id_usuario, username, password, dni, email, telefono, nombre, direccion]).then(rows => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

function getPassword(id_usuario) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT contrasena FROM usuarios WHERE id_usuario = ?';
        pool.query(sql, [id_usuario]).then(rows => {
            if (rows.length > 0) {
                resolve(rows[0].contrasena);
            } else {
                reject('No existe el usuario');
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM usuarios';
        pool.query(sql).then(rows => {
            resolve(rows);
        }).catch(err => {
            reject(err);
        });
    });
}

function getUserProfile(id_usuario) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
        pool.query(sql, [id_usuario]).then(rows => {
            if (rows.length > 0) {
                resolve(rows[0]);
            } else {
                reject('Id de usuario no existe');
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function updateUserProfile(id_usuario, username, password, dni, email, telefono, nombre, direccion) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE usuarios SET username = ?, contrasena = ?, dni = ?, email = ?, telefono = ?, nombre_completo = ?, direccion = ? WHERE id_usuario = ?';
        pool.query(sql, [username, password, dni, email, telefono, nombre, direccion, id_usuario]).then(rows => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

function deleteUserProfile(id_usuario) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
        pool.query(sql, [id_usuario]).then(rows => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    getTest,
    getUserIdFromUserName,
    insertUser,
    getPassword,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};
