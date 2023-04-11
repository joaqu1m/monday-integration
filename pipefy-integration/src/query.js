const express = require("express")
const router = express.Router()
const database = require("./conexao")
const axios = require('axios')

// DOCS
// https://api-docs.pipefy.com/reference/queries/me/
// https://api-docs.pipefy.com/reference/objects/Card/

const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIzNzgyMjMsImVtYWlsIjoiam9hcXVpbWdwaXJlc0Bob3RtYWlsLmNvbSIsImFwcGxpY2F0aW9uIjozMDAyNDI4MDJ9fQ.3QfG48D1u_8gIuteobouVKNWIor1sec-mvwiHTGafBcq7172YcUJzLOy84DBSApWCOb61xbeIkXzsc5lHdkVLQ"
const pipeId = "303157488"

router.post("/inserir", function (req, res) {
    console.log(req.body)
    let instrucao = `INSERT INTO prospect (nome, email, empresa, ramo, fone) VALUES ('${req.body.nome}', '${req.body.email}', '${req.body.empresa}', '${req.body.ramo}', '${req.body.fone}')`
    console.log("Executando a instrução SQL: \n" + instrucao)
    database.executar(instrucao)
    .then(
        function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro)
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        }
    )
})

router.get("/pipefy/accName", function (req, res) {
    
    return axios({
        url: "https://api.pipefy.com/graphql",
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`
        },
        data: {
            query: `{
                me {
                    name
                }
            }`
        }
    })
    .then((response) => {
        res.status(200).json(response.data)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

router.get("/pipefy/clonePipes", function (req, res) {
    return axios({
        url: "https://api.pipefy.com/graphql",
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`
        },
        data: {
            query: `mutation {
                clonePipes(input: {pipe_template_ids:${pipeId}}) {
                    pipes {
                        id
                        icon
                        name
                        cards_count
                        color
                        description
                        emailAddress
                    }
                }
            }`
        }
    })
    .then((response) => {
        res.status(200).json(response.data)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

router.get("/pipefy/cards", function (req, res) {
    return axios({
        url: "https://api.pipefy.com/graphql",
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`
        },
        data: {
            query: `{
                allCards(pipeId: ${pipeId}) {
                    edges {
                        node {
                            id
                            title
                            url
                            age
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
        }
    })
    .then((response) => {
        res.status(200).json(response.data)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

module.exports = router