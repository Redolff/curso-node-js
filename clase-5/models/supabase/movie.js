import postgres from 'postgres'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'node:crypto'

const connectionString = process.env.SUPABASE_DATABASE
const sql = postgres(connectionString)
export default sql

const supabaseURL = process.env.SUPABASE_URL
const supabaseKEY = process.env.SUPABASE_KEY
const supabase = createClient(supabaseURL, supabaseKEY)

export class MovieModel {

  static async getAll({ genre }) {

    if (genre) {
      let { data: movieXgenre, error } = await supabase
      .from('movie')
      .select('*, movie_genres!inner(genre!inner(name))')
      .eq('movie_genres.genre.name', genre)
      
      if(error) throw new Error(error.message)
      return movieXgenre
    }
    
    let { data: movie, error } = await supabase
    .from ('movie')
    .select ('*');
    
    if(error) throw new Error(error.message)
    return movie;
  }

  static async getById({ id }) {
    
    let { data: movieXid, error } = await supabase
    .from('movie')
    .select('*')
    .eq('id', id);

    if(error) throw new Error(error.message)
    return movieXid
  }

  static async create({ input }) {
    const { genre: genreInput,
      title, year, director, duration, poster, rate
    } = input
    const newUuid = randomUUID()

    try {
      await supabase
      .from('movie')
      .insert([
        { id: newUuid, title: title, year: year, director: director, 
          duration: duration, poster: poster, rate: rate }
        ])
        .select()
      
    }catch(e){
      console.error('Error al insertar película:', e)
      throw new Error('Error creating movie')
    }

    const { data: newMovie, error} = await supabase
    .from('movie')
    .select('*')
    .eq('id', newUuid)

    if(error) throw new Error(error.message)
    return newMovie
  }

  static async delete({ id }) {
    const { data, error } = await supabase
    .from('movie')
    .delete()
    .eq('id', id)

    if(error) throw new Error(error.message)
    return data
  }

  static async update({ id, input }) {
    const { year } = input

    try {
      await supabase
      .from('movie')
      .update({ year: year })
      .eq('id', id)
      .select()
    }catch(e){
      console.error('Error al editar la pelicula: ', e)
      throw new Error('Error update movie')
    }
    
    const { data: updateMovie, error } = await supabase
    .from('movie')
    .select('*')
    .eq('id', id)

    if(error) throw new Error(error.message)
    return updateMovie
  }

}