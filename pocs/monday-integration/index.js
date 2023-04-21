const express = require('express');
const path = require("path")
const app = express();

// Website
app.use(express.static(__dirname + '/'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

// Rest
app.use("/query", require("./src/query"))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

const port = 3000
app.listen(port, function() {
    console.log(`Servidor rodando na porta ${port}`)
})