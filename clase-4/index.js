process.loadEnvFile()
import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT || 1234

const app = express()
app.use(json()) 
app.use(corsMiddleware()) 
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

app.use((req, res) => {
    res.status(404).send('404 Not Found')
})


app.listen(PORT, () => {
    console.log(`Server listenning in PORT http://localhost:${PORT}`)
})