import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from "../errors/index.js"

UnAuthenticatedError
const auth = async (req,res,next) => {
    const token = req.cookies.token
    if(!token) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const testUser = payload.userId === '643c137251a7d583077b1d99'
        req.user = { userId: payload.userId, testUser }
        next()        
    } catch (error) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }
}

export default auth