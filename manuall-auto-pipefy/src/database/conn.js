const mysql = require("mysql2")

const { DB_HOST, DB_USER, DB_PASS } = process.env

module.exports = (query) =>
    new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
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
