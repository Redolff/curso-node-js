const express = require('express')

const PORT = process.env.PORT || 3000
const dittoJSON = require('./pokemon/ditto.json')

const app = express()
app.disable('x-powered-by') // Se desactiva la cabecera por temas de seguridad

// Middleware
/* ---------------- Tambien se podria hacer asi: ------------------ 
----------------> app.use(express.json()) <-----------------------
----------------------------------------------------------------- */
app.use((req, res, next) => {
    if (req.method !== 'POST') return next() // si es distinto de POST avanza a la siguiente REQUEST.
    if (req.headers['content-type'] !== 'application/json') return next() // si es distinto de 'Content-Type':'application/json' avanza a la
    // siguiente REQUEST.

    // solo llegan request que son POST y que tienen el header 'Content-Type': 'application/json'
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        // Mutar la request y meter la informacion en el body
        req.body = data
        next()
    })
})

app.get('/', (req, res) => {
    res.status(200).send('<h1> Bienvenido a la pagina de inicio</h1> ')
})

app.get('/pokemon/ditto', (req, res) => {
    res.status(200).json(dittoJSON)
})

app.post('/', (req, res) => {
    // req.body deberiamos guardarlo en la DB
    res.status(201).json(req.body)
})

// Ultima ruta por que es para manejar errores 404
app.use((req, res) => {
    res.status(404).send('<h1> 404 Not Found </h1>')
})

app.listen(PORT, () => {
    console.log(`Server listenning in PORT http://localhost:${PORT}`)
})