import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
]

export const corsMiddleware = ({ accepted_origin = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => { // Validacion para aceptar PORT 
        if (accepted_origin.includes(origin) || (!origin)) {
            return callback(null, true)
        }

        return callback(new Error('Not allowerd by CORS'))
    }
})