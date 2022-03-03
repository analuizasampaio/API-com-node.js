const express = require("express")
const cors = require("cors")
const app = express()

const filmes = require("./routes/filmesRoutes")
const series = require("./routes/seriesRoutes")

app.use(cors())
app.use(express.json())

app.use("/filmes", filmes)
app.use("/series", series)

module.exports = app