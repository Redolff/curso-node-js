import express from 'express'
import jwt from 'jsonwebtoken'
import { UserRepository } from './user-repository.js'

const PORT = process.env.PORT || 3000
const app = express()
app.set('view engine', 'ejs')
app.use(express.json())

app.get('/', (req, res) => {
    res.render('example', { username: 'Federico Redolfo' })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await UserRepository.login({ username, password })
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_JWT_KEY, {
            expiresIn: '1h'
        })
        res.send({ user })
    }catch(error){
        res.status(401).send(error.message)
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)

    try {
        const id = await UserRepository.create({ username, password })
        res.send({ id })
    }catch(error){
        res.status(400).send(error.message)
    }
})

app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {
    res.render('protected', { username: 'Federico' })
})

app.listen(PORT, () => {
    console.log(`Server listenning in http://localhost:${PORT}`)
}) 