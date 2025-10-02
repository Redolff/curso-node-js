import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { UserRepository } from './user-repository.js'
import 'dotenv/config'
import { middlewareToken } from './middlewares/middlewareToken.js'

const PORT = process.env.PORT
const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())
app.use(middlewareToken)

app.get('/', (req, res) => {    
    const { user } = req.session
    res.render('index', user)
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserRepository.login({ username, password })
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.SECRET_JWT_KEY, 
            { expiresIn: '1h'}
        )

        res
            .cookie('access_token', token, {
                httpOnly: true, // la cookie solo puede accederse desde el servidor
                secure: process.env.NODE_ENV === 'production', // la cookie solo puede accederse en https
                sameSite: 'strict', // la cookie solo puede accederse en el mismo dominio
                maxAge: 1000 * 60 * 60 // la cookie solo tiene validez de tiempo de 1 hs
            })
            .send({ user, token })
    }catch(error){
        res.status(401).send(error.message)
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body

    try {
        const id = await UserRepository.create({ username, password })
        res.send({ id })
    }catch(error){
        res.status(400).send(error.message)
    }
})

app.post('/logout', (req, res) => {
    res.clearCookie('access_token')
    .json({ message: 'Logout successful' })
})

app.get('/protected', (req, res) => {
    const { user } = req.session
    if(!user) return res.status(403).send('Access not authorized')
    res.render('protected', user)
})

app.listen(PORT, () => {
    console.log(`Server listenning in http://localhost:${PORT}`)
}) 