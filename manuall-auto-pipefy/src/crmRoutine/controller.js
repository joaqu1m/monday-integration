const { enviarEmail } = require("./outlookConn.js")
const queries = require("./queries")

const run = () => {
    queries.pegarPrestadoresMais90Dias()
        .then((res) => {
            for(let i = 0; i < res.length; i++) {
                queries.inserir(res[i].id)
                    .then((res2) => {
                        queries.inserir2(res2.insertId)
                            .then(() => {
                                enviarEmail(res[i].email?.trim())
                            })
                    })
            }
        })

    queries.pegarPrestadoresAtivos()
        .then((res) => {
            for(let i = 0; i < res.length; i++) {
                queries.inserir(res[i].id)
                    .then((res2) => {
                        queries.inserir3(res2.insertId)
                            .then(() => {
                                enviarEmail(res[i].email?.trim())
                            })
                    })
            }
        })
}

module.exports = {
    run
}