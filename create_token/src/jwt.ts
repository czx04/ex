import { sign } from 'crypto'
import jwt from 'jsonwebtoken'

// sd jwt de tao token co chu ky sign 

const privatekeyyy = 'thisisprivatekey'
const exp = '15m' // time to use is 15 minutes start at creation time

const signToken = ({
    payload,
    privateKey = privatekeyyy,
    options = {
        algorithm: 'HS256' // this is default algorithm
    }
}: {
    payload: any,
    privateKey?: string,
    options?: jwt.SignOptions
    // 
}) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, privateKey, options,(error,token) => {
            if (error) {
                throw error
            }
            return resolve(token as string)
        }) 
    })
}


// example to create a access token




class Userservice {
    private signAccessToken(user_id:string) {
        return signToken({
            payload: {
                user_id,
                token_type: 'access_token'
            },
            options: {
                expiresIn: exp
            }
        })
    }
}
