const controller = require("../controller/filmesController")

const express = require("express")
const router = express.Router()

router.get("/title", controller.getByTitle)
router.get("/todos", controller.getAll)
router.get("/:id", controller.getById)

router.post("/criar", controller.postMovie)

router.put("/:id", controller.updateMovie)
router.patch("/updateTitle/:id", controller.updateTitle)
router.patch("/update/:id", controller.updateAnything)

router.delete("/delete/:id", controller.deleteMovie)

module.exports = router