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

    const [movies] = await connection.query(
        'SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate FROM movie m;'
    )
    
    return movies
  }

  static async getById({ id }) {
    
  }

  static async create({ input }) {
    
  }

  static async delete({ id }) {
    
  }

  static async update({ id, input }) {
    
  }
}