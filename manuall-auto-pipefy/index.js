const express = require("express")
const app = express()
require("dotenv").config()

const pipefyApi = require("./src/pipefy/controller")

const intervaloChecagem = 15000
let intervalId1, intervalId2

const ligarPipefyApi = (res) => {

    clearInterval(intervalId1)
    clearInterval(intervalId2)

    intervalId1 = setInterval(() => {
        pipefyApi.getInsercoesBD(1)
        pipefyApi.getInsercoesBD(2)
    }, intervaloChecagem * 0.66)
    intervalId2 = setInterval(() => {
        console.log("Procurando por novos dados...")
        pipefyApi.getInsercoesPipefy(1)
        pipefyApi.getInsercoesPipefy(2)
    }, intervaloChecagem)

    console.log("API Rodando")
    res?.status(200).send()
}

const desligarPipefyApi = (res) => {

    clearInterval(intervalId1)
    clearInterval(intervalId2)

    console.log("API Ociosa")
    res?.status(200).send()
}

ligarPipefyApi()

app.post("/ligar/pipefy", (_, res) => ligarPipefyApi(res))
app.post("/desligar/pipefy", (_, res) => desligarPipefyApi(res))

app.listen(3001)
