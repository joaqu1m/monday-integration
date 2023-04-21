var mysql = require("mysql2")

function executar(instrucao) {
    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection({
            host: "localhost",
            database: "testPipefy",
            user: "root",
            password: "***********",
        })
        conexao.connect()
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end()
            if (erro) {
                reject(erro)
            }
            console.log(resultados)
            resolve(resultados)
        })
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage)
        })
    })
}

module.exports = {
    executar
}