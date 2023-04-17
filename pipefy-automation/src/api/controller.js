const queries = require("../database/queries")

const apiContratante = require("./apiContratante")
const apiPrestador = require("./apiPrestador")

const insercoesBD = {
    1: null,
    2: null
}
let insercoesPipefy
let insercoesPipefyFks

function getInsercoesBD(tipo_usuario) {
    queries.pegarInsercoes(tipo_usuario)
    .then((res) => {
        insercoesBD[tipo_usuario] = res
        comparar(tipo_usuario)
    })
}

function getInsercoesPipefy(tipo_usuario) {
    if (tipo_usuario == 1) {
        apiContratante()
        .then((res) => {
            insercoesPipefy = res.rows
            insercoesPipefyFks = res.fks
            comparar(tipo_usuario)
        })
    } else {
        apiPrestador()
        .then((res) => {
            insercoesPipefy = res.rows
            insercoesPipefyFks = res.fks
            comparar(tipo_usuario)
        })
    }
}

getInsercoesBD(1)
getInsercoesBD(2)
setTimeout(() => {
    getInsercoesPipefy(1)
    getInsercoesPipefy(2)
}, 30000)

function comparar(tipo_usuario) {
    if (insercoesBD[tipo_usuario] && insercoesPipefy) {
        for (i = 0; i < insercoesPipefy.length; i++) {
            
            const parametros = {
                encontrou: false,
                mantemStatus: false
            }

            for (j = 0; j < insercoesBD[tipo_usuario].length; j++) {

                if (insercoesPipefy[i].id_cliente == insercoesBD[tipo_usuario][j].id_cliente) {
                    parametros.encontrou = true
                    if (insercoesPipefy[i].status == insercoesBD[tipo_usuario][j].status) {
                        parametros.mantemStatus = true
                    }
                }

            }

            if (parametros.encontrou) {
                if (!parametros.mantemStatus) {
                    compararColunas(insercoesPipefy[i].id_cliente, tipo_usuario)
                }
            } else {
                queries.inserir(insercoesPipefy[i], tipo_usuario)
            }

        }
    }
}

function compararColunas(id_cliente, tipo_usuario) {
    queries.pegarPorId(id_cliente)
    .then((res) => {

        if (res[0] == undefined) {
            return
        }
        
        for (j = 0; j < insercoesPipefy.length; j++) {
            if (insercoesPipefy[j].id_cliente == res[0].id_cliente) {
                for (k = 0; k < insercoesPipefy[j].colunas.length; k++) {
                    queries.update(insercoesPipefy[j].colunas[k], insercoesPipefy[j].id_cliente, tipo_usuario)
                }
            }
        }

        for (j = 0; j < insercoesPipefyFks.length; j++) {
            for (k = 0; k < insercoesPipefyFks[j].infos.length; k++) {
                inserirFk(res[0].id, insercoesPipefyFks[j].infos[k])
            }
        }
    })
}

function inserirFk(id, fk) {
    queries.pegarPorIdFks(id, fk)
    .then((res2) => {
        if (res2[0] == undefined) {
            queries.inserirAreaContratante(id, fk)
        }
    })
}