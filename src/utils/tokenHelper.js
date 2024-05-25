import { config } from "../config/config.js"
import jwt from "jsonwebtoken"

export const EncodeToken= (email,user_id)=>{
    let payload= {email: email,user_id: user_id}
    return jwt.sign(payload,config.ACCESS_TOKEN_SECRET,{expiresIn:config.ACCESS_TOKEN_EXPIRY})
}


export const DecodeToken= (token)=>{
    try {
        
        return jwt.verify(token,config.ACCESS_TOKEN_SECRET)
    } catch (error) {
        return null
    }
}