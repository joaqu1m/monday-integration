const exec = require("../database/conn")

const pegarInsercoes = async (tipo_usuario) => {
    return exec(`
        SELECT id_cliente, status FROM manualldb.prospect
        WHERE tipo_usuario = ${tipo_usuario}
    `)
    .then((res) => {
        return res
    })
}

const pegarPorId = async (id_cliente, tipo_usuario) => {
    return exec(`
        SELECT * FROM manualldb.prospect
        WHERE id_cliente = ${id_cliente}
        AND tipo_usuario = ${tipo_usuario}
    `)
    .then((res) => {
        return res
    })
}

const inserir = async (body, tipo_usuario) => {
    let campos = ""
    let valores = ""
    for (g = 0; g < body.colunas.length; g++) {
        campos += ", " + body.colunas[g].campo
        valores += ", " + body.colunas[g].value
    }
    exec(`
        INSERT INTO manualldb.prospect (id_cliente${campos}, status, tipo_usuario)
        VALUES (${body.id_cliente}${valores}, ${body.status}, ${tipo_usuario});
    `)
    .then(() => {
        console.log(
            `Inserção do cliente ${body.id_cliente} no estágio ${body.status} realizada`
        )
    })
}

const update = async (body, id_cliente, tipo_usuario) => {
    exec(`
        UPDATE manualldb.prospect SET ${body.campo} = ${body.value}
        WHERE id_cliente = ${id_cliente} AND tipo_usuario = ${tipo_usuario}
    `)
}

module.exports = {
    pegarInsercoes,
    pegarPorId,
    inserir,
    update,
}