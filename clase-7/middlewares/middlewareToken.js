import jwt from 'jsonwebtoken'

export const middlewareToken = (req, res, next) => {
    const token = req.cookies?.access_token

    req.session = { user: null }
    
    try {
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
        req.session.user = data
    } catch(error){
        req.session.user = null
    }

    next()
}