
const { request } = require("express")
const series = require("../models/series.json")

const getAll = (request, response)=>{
    console.log(request.url)
    response.status(200).send(series)
}

const getById = (request, response) =>{
    const id = request.query.id
    response.status(200).send(series.find(serie => serie.id == id ))
}

const getByGenre = (request, response) =>{
    const genero = request.query.genero
    
    let novaLista = []

    series.forEach(serie => {
        let generoList = serie.genre
        for (i of generoList){
            console.log(i)
            if (i.includes(genero) && generoList.includes(i)){
                novaLista.push(serie)

            }
        }
    });  
    console.log(novaLista)
    response.status(200).send(novaLista)

}

module.exports = {
    getAll,
    getById,
    getByGenre
}