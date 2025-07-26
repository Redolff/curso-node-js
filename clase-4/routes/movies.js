import { Router } from "express";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
import { MovieModel } from "../models/movie.js";

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
    try {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        res.json(movies)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

moviesRouter.get('/:id', async (req, res) => { // path-to-regexp
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.patch('/movies/:id', async (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    if (result.error) {
        res.statusCode(400).json({ message: JSON.parse(result.error.message) })
    }

    const updatedMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
})

moviesRouter.post('/movies', async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
})

// DELETE
moviesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const movieIndex = await MovieModel.delete({ id })
    if(movieIndex === false) {
        return res.status(404).json({ message: 'Movie not found' })
    }
    
    return res.json({ message: 'Movie deleted' })
})