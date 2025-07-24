import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(json()) // CORS --> validacion de 'Content-Type: application/json'
app.use(corsMiddleware()) // CORS instalado, por defecto el "*"

app.disable('x-powered-by')

// Metodos normales: GET/HEAD/POST
// Metodos complejos: PUT/PATCH/DELETE
// CORS Pre-flight

// OPTIONS

app.use('/movies', moviesRouter)

app.use((req, res) => {
    res.status(404).send('404 Not Found')
})


app.listen(PORT, () => {
    console.log(`Server listenning in PORT http://localhost:${PORT}`)
})