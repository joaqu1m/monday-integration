const trocarCaractere = require("./trocarCaractere")

function formatCelular(numero) {
    return Number(trocarCaractere(trocarCaractere(trocarCaractere(numero, " ", ""), "+", ""), "-", ""))
}

function formatDate(date) {
    return `'${new Date(`${date.substring(3,5)}/${date.substring(0,2)}/${date.substring(6,10)}`).toJSON().slice(0, 10)}'`
}

module.exports = {
    formatCelular: formatCelular,
    formatDate: formatDate
}