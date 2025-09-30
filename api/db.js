const sqlite3 = require('sqlite3');

const DB_PATH = './mydatabase.sqlite';

let db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos SQLite.');
    }
});

module.exports = db;