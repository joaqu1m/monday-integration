const mysql = require("mysql2")

module.exports = {
    executar: (query) => {
        return new Promise((resolve, reject) => {
            const con = mysql.createConnection({
                host: "localhost",
                database: "manualldb",
                user: "root",
                password: "database_password"
            })
            con.connect()
            con.query(query, (err, res) => {
                con.end()
                err ? reject(err) : resolve(res)
            })
            con.on("error", (err) => ("Conection Error: ", err.sqlMessage))
        })
    }
}
