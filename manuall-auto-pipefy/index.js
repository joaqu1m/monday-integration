const express = require('express')
const app = express()
require('dotenv').config()

const src = require("./src/api/controller")

const intervaloChecagem = 15000
let intervalId1, intervalId2

app.post('/ligar', (req, res) => {

    // Cancelando os intervalos como prevenção à já estarem rodando
    clearInterval(intervalId1)
    clearInterval(intervalId2)

    // Rodando intervalos
    intervalId1 = setInterval(() => {
        src.getInsercoesBD(1)
        src.getInsercoesBD(2)
    }, intervaloChecagem*0.66)
    intervalId2 = setInterval(() => {
        console.log("Procurando por novos dados...")
        src.getInsercoesPipefy(1)
        src.getInsercoesPipefy(2)
    }, intervaloChecagem)

    console.log("API Rodando")
    res.status(200).send("API Rodando")
})

app.post('/desligar', (req, res) => {
    clearInterval(intervalId1)
    clearInterval(intervalId2)

    console.log("API Ociosa")
    res.status(200).send("API Ociosa")
})

app.listen(3001, () => {
    console.log("API Ociosa")
})