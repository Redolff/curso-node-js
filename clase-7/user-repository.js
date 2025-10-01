import crypto from 'node:crypto'
import dbLocal from "db-local"
import bcrypt from 'bcrypt'

const { Schema } = new dbLocal({ path: './db' })

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

export class UserRepository {
    static async create ({ username, password }) {
        // 1. Validaciones (con ZOD puedo hacerlas)
        Validation.username(username)
        Validation.password(password)

        // 2. Asegurarse que el username no existe
        const user = User.findOne({ username })
        if(user) throw new Error('Username already exists')

        const id = crypto.randomUUID() // --> Las genera las DB
        const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS)

        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save()

        return id
    }

    static async login ({ username, password }) {
        Validation.username(username )
        Validation.password(password)

        const user = User.findOne({ username })
        if(!user) throw new Error('username does not exists')
        
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) throw new Error('password is invalid')
        
        const { password: _, ...publicUser } = user

        return publicUser
    }
}

class Validation {
    static username ({ username }) {
        if(typeof username !== string) throw new Error('Username must be a string')
        if(username.length < 3) throw new Error('Username must be at least 3 characters long')
    }

    static password ({ password }) {
        if(typeof password !== string) throw new Error('Password must be a string')
        if(password.length < 6) throw new Error('Password must be at least 6 characters long')

    }
}