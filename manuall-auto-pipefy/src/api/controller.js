const queries = require("../database/queries")

const apis = {
    1: require("./apiContratante"),
    2: require("./apiPrestador")
} 

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
    })
}

function getInsercoesPipefy(tipo_usuario) {
    apis[tipo_usuario]()
    .then((res) => {
        insercoesPipefy = res.rows
        insercoesPipefyFks = res.fks
        comparar(tipo_usuario)
    })
}

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
                }

            }

            if (parametros.encontrou) {
                compararColunas(insercoesPipefy[i], tipo_usuario)
            } else {
                queries.inserir(insercoesPipefy[i], tipo_usuario)
            }
        }
    }
}

function compararColunas(cliente, tipo_usuario) {
    queries.pegarPorId(cliente.id_cliente, tipo_usuario)
    .then((res) => {

        if (res[0] == undefined) {
            return
        }
        
        for (k = 0; k < cliente.colunas.length; k++) {
            queries.update(cliente.colunas[k], cliente.id_cliente, tipo_usuario)
        }

        for (j = 0; j < insercoesPipefyFks.length; j++) {
            if (insercoesPipefyFks[j].id_cliente == cliente.id_cliente) {
                for (k = 0; k < insercoesPipefyFks[j].infos.length; k++) {
                    inserirFk(res[0].id, insercoesPipefyFks[j].infos[k])
                }
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

module.exports = {
    getInsercoesBD: getInsercoesBD,
    getInsercoesPipefy: getInsercoesPipefy
}