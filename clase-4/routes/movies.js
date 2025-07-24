import { Router } from "express";
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
import { readJSON } from '../utils/utils.js'

const moviesJSON = readJSON('../movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = moviesJSON.filter(
            movie => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(moviesJSON)
})

moviesRouter.get('/:id', (req, res) => { // path-to-regexp
    const { id } = req.params
    const movie = moviesJSON.find((x) => x.id === id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.patch('/movies/:id', (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    if (result.error) {
        res.statusCode(400).json({ message: JSON.parse(result.error.message) })
    }

    const movieIndex = moviesJSON.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updatedMovie = {
        ...moviesJSON[movieIndex],
        ...result.data
    }

    moviesJSON[movieIndex] = updatedMovie

    return res.json(updatedMovie)
})

moviesRouter.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: randomUUID(),
        ...result.data
    }

    // No es REST porque se esta guardando en memoria
    moviesJSON.push(newMovie)

    res.status(201).json(newMovie)
})

// DELETE
moviesRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = moviesJSON.findIndex((x) => x.id === id)

    if (movieIndex === -1) return res.statusCode(404).json({ message: 'Movie not found' })

    moviesJSON.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
})