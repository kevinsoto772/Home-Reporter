const mysql = require('promise-mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'home'
})

function obtenerConeccion(){
    return connection;
}

module.exports = {
    obtenerConeccion
}