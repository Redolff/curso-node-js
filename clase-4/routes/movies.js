import { Router } from "express";
import { MovieController } from "../controllers/movie.js";

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.patch('/movies/:id', MovieController.update)

moviesRouter.post('/movies', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)