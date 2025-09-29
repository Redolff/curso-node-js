import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { createClient } from '@libsql/client'

const PORT = process.env.PORT || 3000

dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

const db = createClient({
    url: "libsql://free-mindworm-redolff.aws-us-east-1.turso.io",
    authToken: process.env.DB_TOKEN
})

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user TEXT
    );    
`)

io.on('connection', async (socket) => {
    console.log('a user has connected!')
    
    socket.on('disconnect', () => {
        console.log('an user has disconnect!')
    })

    socket.on('chat message', async (message) => {
        let result
        const username = socket.handshake.auth.username ?? 'anonymus'
        try {
            result = await db.execute({
                sql: 'INSERT INTO messages (content, user) VALUES (:message, :username)',
                args: { message, username }
            })
        } catch(e) {
            console.error(e)
            return
        }

        io.emit('chat message', message, result.lastInsertRowid.toString(), username)
    })

    if(!socket.recovered) { // ---> Si no se recuperaron los mensajes 
        try {
            const results = await db.execute({
                sql: 'SELECT id, content, user FROM messages WHERE id > ?',
                args: [socket.handshake.auth.serverOffset ?? 0]
            })

            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString(), row.user)
            });

        } catch(e) {
            console.error(e)
            return
        }
    }
})

app.use(logger('dev')) /// ---> DEPENDENCIA PARA ACCEDER 

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})