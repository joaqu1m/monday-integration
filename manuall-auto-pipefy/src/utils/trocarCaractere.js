function trocarCaractere(string, char1, char2) {
    while (string.indexOf(char1) > -1) {
        string = string.replace(char1, char2)
    }
    return string
}

module.exports = trocarCaractere