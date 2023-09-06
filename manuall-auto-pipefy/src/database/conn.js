const mysql = require("mysql2")

module.exports = (query) =>
    new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: "localhost",
            database: "manualldb",
            user: "root",
            password: "database_password"
        })
        con.connect()
        con.query(query, (err, res) => {
            con.end()
            err
                ? reject(err)
                : resolve(res)
        })
        con.on("error", (err) => {
            reject(("Conection Error: ", err.sqlMessage))
        })
    })
