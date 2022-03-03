const filmesJson = require("../models/filmes.json")

const getAll = (request, response) => {
    
    response.status(200).send(filmesJson)
}
const getById = (request, response) => {
    const idRequest = request.params.id
    response.status(200).send(filmesJson.find(filme => filme.id == idRequest))
}

const getByTitle = (request, response) => {
    const tituloRequest = request.query.titulo
    response.status(200).
        send(filmesJson.filter
            (filme => filme.Title == tituloRequest))
}

const postMovie = (request, response) => {
    let tituloRequest = request.body.Title
    let descricaoRequest = request.body.Plot

    let novoFilme = {
        id: (filmesJson.length) + 1,
        Title: tituloRequest,
        Plot: descricaoRequest
    }

    filmesJson.push(novoFilme)

    response.status(201).json(
        [{
            "mensagem": "filme cadastrado com sucesso",
            novoFilme
        }])
}
const deleteMovie = (request, response) => {
    const idRequest = request.params.id
    const filmeFiltrado = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeFiltrado)
    filmesJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "filme deletado com sucesso",
        filmesJson
    }])
}

const updateMovie = (request, response) => {
    const idRequest = request.params.id
    let filmeAtualizado = request.body
    const filmeFiltrado = filmesJson.find(filme => filme.id == idRequest)
    const indice = filmesJson.indexOf(filmeFiltrado)

    filmeAtualizado.id = idRequest

    filmesJson.splice(indice, 1, filmeAtualizado)


    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        filmeAtualizado
    }])

}

const updateTitle = (request, response) => {
    const idRequest = request.params.id
    let newTitle = request.body.Title;
    const filmeFiltrado = filmesJson.find(filme => filme.id == idRequest)

    filmeFiltrado.Title = newTitle;

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        filmeFiltrado
    }])

}

const updateAnything = (request, response) => {
    const idRequest = request.params.id
    const atualizacaoBody = request.body
    const filmeFiltrado = filmesJson.find(filme => filme.id == idRequest)

    atualizacaoBody.id = idRequest

    Object.keys(atualizacaoBody).forEach((chave) => {
        filmeFiltrado[chave] = atualizacaoBody[chave]
    })

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        filmeFiltrado
    }])
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    postMovie,
    updateMovie,
    updateTitle,
    updateAnything,
    deleteMovie

}

