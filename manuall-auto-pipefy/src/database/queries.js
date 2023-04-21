const database = require("./conexao")

function pegarInsercoes(tipo_usuario) {
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

function pegarPorIdFks(id, fk) {
    return database.executar(
        `select * from prospect_area where prospect_id = ${id} and area_id = ${fk};`
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

function inserirAreaContratante(id, fk) {
    database.executar(
        `insert into prospect_area (prospect_id, area_id) values (${id}, ${fk});`
    )
    .then((res) => {
        console.log(`Cliente de id ${id} registrado na área de id ${fk}`)
    })
}

function update(body, id_cliente, tipo_usuario) {
    database.executar(
        `update prospect set ${body.campo} = ${body.value} where id_cliente = ${id_cliente} and tipo_usuario = ${tipo_usuario}`
    )
}

module.exports = {
    pegarInsercoes: pegarInsercoes,
    pegarPorId: pegarPorId,
    pegarPorIdFks: pegarPorIdFks,
    inserir: inserir,
    inserirAreaContratante: inserirAreaContratante,
    update: update
}