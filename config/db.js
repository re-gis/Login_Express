const mysql = require('mysql')

// Create a connection to DB


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
})

module.exports = conn