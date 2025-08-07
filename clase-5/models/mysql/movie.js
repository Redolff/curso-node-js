import mysql from 'mysql2/promise'
process.loadEnvFile()

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}

const connection = await mysql.createConnection(config)

export class MovieModel {

  static async getAll({ genre }) {
    // Hacer la parte del genero
    if (genre) {
      const lowerGenre = genre.toLowerCase()

      const [moviesXgenre] = await connection.query(
        `SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate, g.name as genre
          FROM movie m
          INNER JOIN movie_genres mg
            ON (m.id = mg.movie_id)
          INNER JOIN genre g
            ON (mg.genre_id = g.id)
          WHERE LOWER(g.name) = ?;`, [lowerGenre]
      )
      if (moviesXgenre.length === 0) return null
      return moviesXgenre
    }

    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate 
          FROM movie m;`
    )
    if (movies.length === 0) return null
    return movies
  }

  static async getById({ id }) {
    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate
        FROM movie 
        WHERE id = UUID_TO_BIN(?);`, [id]
    )

    if (movie.length === 0) return null
    return movie
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title, year, director, duration, poster, rate } = input

    const [newId] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = newId

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
          VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )
    }
    catch (e) {
      console.error('Error al insertar película:', e)
      throw new Error('Error creating movie')
    }

    const [newMovie] = await connection.query(`
        SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate
          FROM movie 
          WHERE id = UUID_TO_BIN(?);`, [uuid]
    )

    return newMovie
  }

  static async delete({ id }) {
    const [movie] = await connection.query(
      `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`, [id]
    )

    if (movie.length === 0) return null
    return movie
  }

  static async update({ id, input }) {
    const { year } = input

    try{
      await connection.query(
        `UPDATE movie 
          SET year = ? 
          WHERE id = UUID_TO_BIN(?);`, 
          [year, id] 
      )
    }
    catch(e){
      console.error('Error al editar la pelicula: ', e)
      throw new Error('Error update movie')
    }

    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate
        FROM movie
        WHERE id = UUID_TO_BIN(?);`, [id]
    )

    if(movie.length === 0) return null
    return movie
  }
}