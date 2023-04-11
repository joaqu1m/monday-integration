const express = require("express")
const router = express.Router()
const database = require("./conexao")
const axios = require('axios')

// DOCS
//https://api-docs.pipefy.com/reference/queries/me/
//https://api-docs.pipefy.com/reference/objects/Pipe/

const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIzNTcxMDAsImVtYWlsIjoibWF0aGV1c19tYXRzdW1vdG9Ab3V0bG9vay5jb20iLCJhcHBsaWNhdGlvbiI6MzAwMjQyNzYwfX0.g7LMHtOamFWNpD0fT8_t0oLAqMWJjIeooZ7TUc6Yna0HPgdISr-ENcPapWuJU-Ye3dYczkPZqi6N_iBQQh2iDA"
const pipeId = "303156938"

router.post("/inserir", function (req, res) {
    console.log(req.body)
    var instrucao = `INSERT INTO usuario (nome, statusAtual, fone, carnesBoi, carnesFrango, dtVisita, dtNascimento) VALUES ('${req.body.nome}', '${req.body.status}', '${req.body.fone}', '${req.body.carnesBoi}', '${req.body.carnesFrango}', '${req.body.dtVisita}', '${req.body.dtNascimento}')`
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
            "query": "{ me { name } }"
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
            "query": `mutation {
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
        //(input: {pipe_id:302659208,title: "Card",fields_attributes:[{field_id: "empresa", field_value: "${nomeEmpresa}"},{field_id: "m_quina", field_value: "${maquina}"},{field_id: "componente", field_value: "${componente}"},{field_id: "m_trica", field_value:"${frase}:${metrica}"},],})
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
            "query": `{ allCards(pipeId: ${pipeId}) {
                edges {
                    cursor
                    node {
                        id
                        title
                        url
                        age
                    }
                }
                pageInfo {
                    endCursor
                    startCursor
                }}
            }`
        }
        //(input: {pipe_id:302659208,title: "Card",fields_attributes:[{field_id: "empresa", field_value: "${nomeEmpresa}"},{field_id: "m_quina", field_value: "${maquina}"},{field_id: "componente", field_value: "${componente}"},{field_id: "m_trica", field_value:"${frase}:${metrica}"},],})
    })
    .then((response) => {
        res.status(200).json(response.data)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

module.exports = router