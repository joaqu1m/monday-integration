const trocarCaractere = (string, char1, char2) => {
    while (string.indexOf(char1) > -1) {
        string = string.replace(char1, char2)
    }
    return string
}

const formatCelular = (numero) =>
    Number(trocarCaractere(
        trocarCaractere(
            trocarCaractere(
                numero, " ", ""
            ), "+", ""
        ), "-", ""
    ))

const formatDate = (date) =>
    "'" +
    new Date(
        date.substring(3,5) + "/" +
        date.substring(0,2) + "/" +
        date.substring(6,10)
    ).toJSON().slice(0, 10)
    + "'"

module.exports = {
    trocarCaractere,
    formatCelular,
    formatDate,
}
