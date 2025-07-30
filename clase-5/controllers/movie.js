import { MovieModel } from '../models/mysql/movie.js'
import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export class MovieController {

    static getAll = async (req, res) => {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        // que es lo que renderiza 
        res.json(movies)
    }

    static getById = async (req, res) => {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (movie) return res.json(movie)

        res.status(404).json({ message: 'Movie not found' })
    }

    static update = async (req, res) => {
        const { id } = req.params
        const result = validatePartialMovie(req.body)
        if (result.error) {
            res.statusCode(400).json({ message: JSON.parse(result.error.message) })
        }

        const updatedMovie = await MovieModel.update({ id, input: result.data })

        res.json(updatedMovie)
    }

    static create = async (req, res) => {
        const result = validateMovie(req.body)

        if(result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMovie = await MovieModel.create({ input: result.data })

        res.status(201).json(newMovie)
    }

    static delete = async (req, res) => {
        const { id } = req.params

        const movieIndex = await MovieModel.delete({ id })
        if(movieIndex === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }
        
        res.json({ message: 'Movie deleted' })
    }

}