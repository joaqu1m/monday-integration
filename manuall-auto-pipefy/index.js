const express = require('express')
const app = express()
require('dotenv').config()

const src = require("./src/api/controller")

const intervaloChecagem = 3000
let intervalId1, intervalId2

app.post('/ligar', (req, res) => {
    intervalId1 = setInterval(() => {
        src.getInsercoesBD(1)
        src.getInsercoesBD(2)
    }, intervaloChecagem*0.66)
    intervalId2 = setInterval(() => {
        src.getInsercoesPipefy(1)
        src.getInsercoesPipefy(2)
    }, intervaloChecagem)

    console.log("API Ligada")
    res.status(200).send("API Ligada")
})

app.post('/desligar', (req, res) => {
    clearInterval(intervalId1)
    clearInterval(intervalId2)

    console.log("API Desligada")
    res.status(200).send("API Desligada")
})

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log("API Ociosa")
})
