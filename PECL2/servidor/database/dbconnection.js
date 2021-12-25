const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DATABASE_IP,
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

function insertRfid(id_rfid, id_usuario, id_oficina) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO rfid (id_rfid, id_usuario, id_oficina) VALUES (?, ?, ?)';
        pool.query(sql, [id_rfid, id_usuario, id_oficina]).then(rows => {
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
        const sql = 'SELECT usuarios.id_usuario, username, contrasena, dni, email, telefono, nombre_completo, direccion, id_rfid as rfid, id_oficina as oficina FROM usuarios inner join rfid on usuarios.id_usuario = rfid.id_usuario WHERE usuarios.id_usuario = ?';
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

function getUserNotifications(id_usuario) {
    return new Promise((resolve, reject) => {
        const sql = 'select id_notificacion, username, email, nombre_completo, fecha_positivo from notificaciones inner join (select id_positivo, username, email, nombre_completo, fecha_positivo from positivos inner join usuarios on positivos.id_usuario = usuarios.id_usuario) as tabla1 on notificaciones.id_positivo = tabla1.id_positivo where notificaciones.id_usuario = ?';
        pool.query(sql, [id_usuario]).then(rows => {
            resolve(rows);
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

function getCard(id_rfid) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM rfid WHERE id_rfid = ?';
        pool.query(sql, [id_rfid]).then(rows => {
            resolve(rows);
        }).catch(err => {
            reject(err);
        });
    });
}

function isUserIn(id_usuario) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM log WHERE id_usuario = ? and salida is null';
        pool.query(sql, [id_usuario]).then(rows => {
            resolve(rows.length > 0);
        }).catch(err => {
            reject(err);
        });
    });
}

function takeUserOut(id_usuario, salida) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE log SET salida = ? WHERE id_usuario = ? and salida is null';
        pool.query(sql, [salida, id_usuario]).then(rows => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

function setUserIn(id_usuario, entrada) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO log (id_usuario, entrada) VALUES (?, ?)';
        pool.query(sql, [id_usuario, entrada]).then(rows => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

function getOfficeCapacityFromRfid(id_rfid) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM oficinas WHERE id_oficina = (SELECT id_oficina FROM rfid WHERE id_rfid = ?)';
        pool.query(sql, [id_rfid]).then(rows => {
            if (rows.length > 0) {
                const aforo = rows[0].aforo;
                const id_oficina = rows[0].id_oficina;
                const sql2 = 'SELECT count(*) AS aforo_actual FROM log WHERE id_usuario IN (SELECT id_usuario FROM rfid WHERE id_oficina = ?) and salida is null;'
                pool.query(sql2, [id_oficina]).then(rows2 => {
                    resolve(aforo - rows2[0].aforo_actual);
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject('No existe el rfid');
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function getActualOfficeCapacity(id_oficina) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT count(*) AS aforo_actual FROM log WHERE id_usuario IN (SELECT id_usuario FROM rfid WHERE id_oficina = ?) and salida is null;'
        pool.query(sql, [id_oficina]).then(rows => {
            resolve(rows[0].aforo_actual);
        }).catch(err => {
            reject(err);
        });
    });
}

function getOficinas() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id_oficina FROM oficinas';
        pool.query(sql).then(rows => {
            resolve(rows);
        }).catch(err => {
            reject(err);
        });
    });
}

function getOficinaFromRfid(id_rfid) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id_oficina FROM rfid WHERE id_rfid = ?';
        pool.query(sql, [id_rfid]).then(rows => {
            if (rows.length > 0) {
                resolve(rows[0].id_oficina);
            } else {
                reject('No existe el rfid');
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function getUsersLogLastWeek(id_usuario) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM log WHERE id_usuario = ? and entrada > DATE_SUB(NOW(), INTERVAL 7 DAY)';
        pool.query(sql, [id_usuario]).then(rows => {
            resolve(rows);
        }).catch(err => {
            reject(err);
        });
    });
}

function insertPositivo(id_positivo, id_usuario, fecha) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO positivos (id_positivo, id_usuario, fecha_positivo) VALUES (?, ?, ?)';
        pool.query(sql, [id_positivo, id_usuario, fecha]).then(rows => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

function getUsuariosInContactWithPositive(entrada, salida) {
    return new Promise((resolve, reject) => {
        const sql = 'select * from log where (entrada < ? and salida > ? and salida < ?) or (entrada > ? and entrada < ?)'
        pool.query(sql, [entrada, entrada, salida, entrada, salida]).then(rows => {
            resolve(rows);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    getTest,
    getUserIdFromUserName,
    insertUser,
    insertRfid,
    getPassword,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    getCard,
    isUserIn,
    takeUserOut,
    getOfficeCapacityFromRfid,
    setUserIn,
    getActualOfficeCapacity,
    getOficinas,
    getOficinaFromRfid,
    getUserNotifications,
    getUsersLogLastWeek,
    insertPositivo,
    getUsuariosInContactWithPositive
};
