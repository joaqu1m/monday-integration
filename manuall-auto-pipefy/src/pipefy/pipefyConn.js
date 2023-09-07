const axios = require("axios")

const { API_KEY } = process.env

const campos = require("./fields")
const format = require("../utils/format")

module.exports = async (pipeId) =>
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
    }, { headers: { Authorization: "Bearer " + API_KEY } })
        .then((res) =>
            res.data.data.allCards.edges.reduce((acc, { node }) => {

                const insercao = {
                    id_cliente: node.id,
                    status: campos.status.opts[node.current_phase.name],
                    colunas: []
                }

                for (f = 0; f < node.fields.length; f++) {
                    const colunaAtual = campos[node.fields[f].name]
                    const valorCampo = node.fields[f].value

                    insercao.colunas.push({
                        campo: colunaAtual.colunaBanco,
                        value: !colunaAtual.opts
                            ? colunaAtual.formatar
                                ? format[colunaAtual.formatar](valorCampo)
                                : "'" + valorCampo + "'"
                            : colunaAtual.opts[valorCampo]
                    })
                }

                return acc.concat(insercao)
            }, [])
        )
        .catch(err => {
            return err
        })
