const mysql = require("mysql2")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mushroom_app"
})

module.exports = db
