import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/utils.js'
const moviesJSON = readJSON('../movies.json')

export class MovieModel {

    static getAll = async ({ genre }) => {
        if (genre) {
            return moviesJSON.filter(
                movie => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return moviesJSON
    }

    static getById = async ({ id }) => {
        const movie = moviesJSON.find((x) => x.id === id)
        return movie
    }

    static update = async ({ id, input }) => {
        const movieIndex = moviesJSON.findIndex((movie) => movie.id === id)

        if (movieIndex === -1) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        const updatedMovie = {
            ...moviesJSON[movieIndex],
            ...input
        }

        return updatedMovie
    }

    static create = async ({ input }) => {
        const newMovie = {
            id: randomUUID(),
            ...input
        }

        moviesJSON.push(newMovie)

        return newMovie
    }

    static delete = async ({ id }) => {
        const movieIndex = moviesJSON.findIndex((x) => x.id === id)
        if (movieIndex === -1) return false
    
        moviesJSON.splice(movieIndex, 1)
        return true
    }

}