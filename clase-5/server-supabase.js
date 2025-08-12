import { createIndex } from "./index.js";
import { MovieModel } from "./models/supabase/movie.js"

createIndex({ movieModel: MovieModel })