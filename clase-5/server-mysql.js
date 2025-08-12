import { createIndex } from "./index.js";
import { MovieModel } from "./models/mysql/movie.js"

createIndex({ movieModel: MovieModel })