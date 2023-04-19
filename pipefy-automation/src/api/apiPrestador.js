const axios = require("axios")

const apiKey = process.env.API_KEY
const pipeId = "303175891"

const campos = require("./fields")
const format = require("../utils/format")

function getPrestadores() {

    let prestadores = {
        rows: [],
        fks: []
    }

    return axios.post("https://api.pipefy.com/graphql", {
        query: `{
            allCards(pipeId: ${pipeId}) {
                edges {
                    node {
                        id
                        fields {
                            name
                            value
                        }
                        current_phase {
                            name
                        }
                    }
                }
            }
        }`
    }, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    .then((res) => {
    
        for (i = 0; i < res.data.data.allCards.edges.length; i++) {
    
            const usuario = res.data.data.allCards.edges[i].node
    
            const insercao = {
                id_cliente: usuario.id,
                status: campos.status.opts[usuario.current_phase.name],
                colunas: []
            }
    
            for (f = 0; f < usuario.fields.length; f++) {
                const colunaAtual = campos[usuario.fields[f].name]
                const valorCampo = usuario.fields[f].value
    
                let campoInsercao
                if (!colunaAtual.opts) {
                    if (colunaAtual.formatar) {
                        campoInsercao = format[colunaAtual.formatar](valorCampo)
                    } else {
                        campoInsercao = `'${valorCampo}'`
                    }
                } else if (colunaAtual.fkExterna) {

                    const valorCampoFksBruto = JSON.parse(valorCampo)

                    let valorCampoFks = []
                    
                    for (j = 0; j < valorCampoFksBruto.length; j++) {
                        
                        valorCampoFks.push(colunaAtual.opts[valorCampoFksBruto[j]])
                    }
                    prestadores.fks.push({
                        id_cliente: usuario.id,
                        nome: colunaAtual.fkExterna,
                        infos: valorCampoFks
                    })
                    continue
                } else {
                    campoInsercao = colunaAtual.opts[valorCampo]
                }
    
                insercao.colunas.push({
                    campo: colunaAtual.colunaBanco,
                    value: campoInsercao
                })
            }
    
            prestadores.rows.push(insercao)
        }

        return prestadores
    })
    .catch((err) => {
        return err
    })
}

module.exports = getPrestadores