const trocarCaractere = require("./trocarCaractere")

function formatCelular(numero) {
    return Number(trocarCaractere(trocarCaractere(trocarCaractere(numero, " ", ""), "+", ""), "-", ""))
}

function formatDate(date) {
    return `'${new Date(date).toJSON().slice(0, 10)}'`
}

module.exports = {
    formatCelular: formatCelular,
    formatDate: formatDate
}