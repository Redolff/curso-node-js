import { createIndex } from "./index.js";
import { MovieModel } from "./models/local-file-system/movie.js"

createIndex({ movieModel: MovieModel })