const express = require("express")
const router = express.Router()
const database = require("./conexao")
const axios = require('axios')

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

// url para encontrar as configs de query do monday
//https://support.monday.com/hc/en-us/articles/360013465599-API-Quickstart-Tutorial-Javascript
router.get("/monday/:apiKey", function (req, res) {
    return axios({
        url: "https://api.monday.com/v2",
        method: 'POST',
        headers: {
            'Authorization': req.params.apiKey
        },
        data: {
            query: `{
                boards {
                    id
                    name
                    description
                    columns {
                        id
                        title
                        type
                        settings_str
                    }
                    items {
                        id
                        name
                        column_values {
                            id
                            value
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