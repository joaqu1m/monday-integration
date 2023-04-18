const mysql = require("mysql2")

function executar(query) {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: "localhost",
            database: "mydb",
            user: "aluno",
            password: "sptech"
        })
        con.connect()
        con.query(query, (err, res) => {
            con.end()
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
        con.on('error', (err) => {
            return ("MySQL Error: ", err.sqlMessage)
        })
    })
}

module.exports = {
    executar
}