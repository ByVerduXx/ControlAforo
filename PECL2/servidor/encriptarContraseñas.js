const bcrypt = require('bcrypt');
require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DATABASE_IP,
    user: 'ubicomp',
    password: 'ubicomp',
    database: 'controlaforo',
    connectionLimit: 20
});

let usuarios = [];
const query = 'SELECT id_usuario, contrasena FROM usuarios';
pool.query(query).then(rows => {
    usuarios = rows;
    for (let i = 0; i < usuarios.length; i++) {
        const id_usuario = usuarios[i].id_usuario;
        const contrasena = usuarios[i].contrasena;
        const hash = bcrypt.hashSync(contrasena, 10);
        const sql = 'UPDATE usuarios SET contrasena = ? WHERE id_usuario = ?';
        pool.query(sql, [hash, id_usuario]).then(rows => {
            console.log('Contraseña actualizada');
        }).catch(err => {
            console.log(err);
        });
    }
    
}).catch(err => {
    console.log(err);
});




