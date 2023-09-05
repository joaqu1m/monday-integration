const axios = require("axios")

const { API_KEY } = process.env

const campos = require("./fields")
const format = require("../utils/format")

module.exports = (pipeId) =>
    axios.post("https://api.pipefy.com/graphql", {
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
            Authorization: "Bearer " + API_KEY
        }
    })
    .then((res) => {
    
        const usuarios = []

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
    
                insercao.colunas.push({
                    campo: colunaAtual.colunaBanco,
                    value: !colunaAtual.opts
                        ? colunaAtual.formatar
                            ? format[colunaAtual.formatar](valorCampo)
                            : "'" + valorCampo + "'"
                        : colunaAtual.opts[valorCampo]
                })
            }
    
            usuarios.push(insercao)
        }

        return usuarios
    })
    .catch(err => {
        return err
    })
