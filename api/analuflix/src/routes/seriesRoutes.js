const controller = require("../controller/seriesController")

const express = require("express")
const router = express.Router()

router.get("/todos", controller.getAll)
router.get("/", controller.getById)
router.get("/genero", controller.getByGenre)

module.exports = router