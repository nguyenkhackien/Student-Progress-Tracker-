require("dotenv").config()
const mysql = require( "mysql2" )

// connect to DB
const connection = mysql.createPool({
    host: process.env.HOST_NAME, // localhost
    port: process.env.DB_PORT, // 3307
    user: process.env.DB_USER, // root
    password: process.env.DB_PASSWORD, //123456789
    database: process.env.DB_NAME, // MyDB
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0,
})

module.exports = connection
