const express = require("express")
const app = express()
require("dotenv").config()

const crmApi = require("./src/crm_mailer/controller")
const pipefyApi = require("./src/pipefy/controller")

// ================================
// =        CRM MAILER API        =
// ================================

const crmIntervaloCheck = 5000
let crmIntervalId1

const ligarCrmApi = (res) => {

    clearInterval(crmIntervalId1)

    crmIntervalId1 = setInterval(() => {
        crmApi.executarNada()
    }, crmIntervaloCheck)

    console.log("API Crm Rodando")
    res?.status(200).send()
}
const desligarCrmApi = (res) => {

    clearInterval(crmIntervalId1)

    console.log("API Crm Ociosa")
    res?.status(200).send()
}

// ================================
// =          PIPEFY API          =
// ================================

const pipefyIntervaloCheck = 15000
let pipefyIntervalId1, pipefyIntervalId2

const ligarPipefyApi = (res) => {

    clearInterval(pipefyIntervalId1)
    clearInterval(pipefyIntervalId2)

    pipefyIntervalId1 = setInterval(() => {
        pipefyApi.getInsercoesBD(1)
        pipefyApi.getInsercoesBD(2)
    }, pipefyIntervaloCheck * 0.66)
    pipefyIntervalId2 = setInterval(() => {
        console.log("Procurando por novos dados...")
        pipefyApi.getInsercoesPipefy(1)
        pipefyApi.getInsercoesPipefy(2)
    }, pipefyIntervaloCheck)

    console.log("API Pipefy Rodando")
    res?.status(200).send()
}
const desligarPipefyApi = (res) => {

    clearInterval(pipefyIntervalId1)
    clearInterval(pipefyIntervalId2)

    console.log("API Pipefy Ociosa")
    res?.status(200).send()
}

ligarCrmApi()
ligarPipefyApi()

app.post("/ligar/crm", (_, res) => ligarCrmApi(res))
app.post("/desligar/crm", (_, res) => desligarCrmApi(res))

app.post("/ligar/pipefy", (_, res) => ligarPipefyApi(res))
app.post("/desligar/pipefy", (_, res) => desligarPipefyApi(res))

app.listen(3001)
