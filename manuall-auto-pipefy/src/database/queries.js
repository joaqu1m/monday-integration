const database = require("./conn")

const pegarInsercoes = (tipo_usuario) => {
    return database.executar(
        `SELECT id_cliente, status FROM prospect where tipo_usuario = ${tipo_usuario}`
    )
    .then((res) => {
        return res
    })
}

function pegarPorId(id_cliente, tipo_usuario) {
    return database.executar(
        `SELECT * FROM prospect WHERE id_cliente = ${id_cliente} and tipo_usuario = ${tipo_usuario}`
    )
    .then((res) => {
        return res
    })
}

function inserir(body, tipo_usuario) {
    let campos = ""
    let valores = ""
    for (g = 0; g < body.colunas.length; g++) {
        campos += `, ${body.colunas[g].campo}`
        valores += `, ${body.colunas[g].value}`
    }
    database.executar(
        `INSERT INTO prospect (id_cliente${campos}, status, tipo_usuario) VALUES (${body.id_cliente}${valores}, ${body.status}, ${tipo_usuario});`
    )
    .then((res) => {
        console.log(
            `Inserção do cliente ${body.id_cliente} no estágio ${body.status} realizada`
        )
    })
}

function update(body, id_cliente, tipo_usuario) {
    database.executar(
        `update prospect set ${body.campo} = ${body.value} where id_cliente = ${id_cliente} and tipo_usuario = ${tipo_usuario}`
    )
}

module.exports = {
    pegarInsercoes,
    pegarPorId,
    inserir,
    update,
}