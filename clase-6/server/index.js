import express from 'express'
import logger from 'morgan'

const PORT = process.env.PORT || 3000

const app = express()
app.use(logger('dev')) /// ---> DEPENDENCIA PARA ACCEDER 

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})