const queries = require("../database/queries")
const api = require("./pipefyConn")

const { CONTRATANTE_ID, PRESTADOR_ID } = process.env

const insercoesBD = { 1: null, 2: null }

let insercoesPipefy

function getInsercoesBD(tipo_usuario) {
    queries.pegarInsercoes(tipo_usuario)
        .then(res => {
            insercoesBD[tipo_usuario] = res
        })
}

function getInsercoesPipefy(tipo_usuario) {
    api(
        tipo_usuario === 1
            ? CONTRATANTE_ID
            : PRESTADOR_ID
    )
        .then(res => {
            insercoesPipefy = res.rows
            comparar(tipo_usuario)
        })
}

function comparar(tipo_usuario) {
    if (insercoesBD[tipo_usuario] && insercoesPipefy) {
        for (i = 0; i < insercoesPipefy.length; i++) {

            let encontrou = false

            for (j = 0; j < insercoesBD[tipo_usuario].length; j++) {
                if (
                    insercoesPipefy[i].id_cliente == insercoesBD[tipo_usuario][j].id_cliente
                ) encontrou = true
            }

            encontrou
                ? compararColunas(insercoesPipefy[i], tipo_usuario)
                : queries.inserir(insercoesPipefy[i], tipo_usuario)
        }
    }
}

function compararColunas(cliente, tipo_usuario) {
    queries.pegarPorId(cliente.id_cliente, tipo_usuario)
    .then(res => {

        if (res[0] == undefined) return
        
        for (k = 0; k < cliente.colunas.length; k++) {
            queries.update(cliente.colunas[k], cliente.id_cliente, tipo_usuario)
        }
    })
}

module.exports = {
    getInsercoesBD,
    getInsercoesPipefy,
}