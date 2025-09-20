import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const PORT = process.env.PORT || 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user has connected!')
    
    socket.on('disconnect', () => {
        console.log('an user has disconnect!')
    })

    socket.on('chat message', (message) => {
        console.log('message: '+ message)
    })
})

app.use(logger('dev')) /// ---> DEPENDENCIA PARA ACCEDER 

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})