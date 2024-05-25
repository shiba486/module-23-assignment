import {DecodeToken} from "./../utils/tokenHelper.js"

export const authVerification=(req,res,next)=>{
        let token = req.headers["token"]
        if(!token){
            token = req.cookies["token"]
           
        }
        let decodeToken = DecodeToken(token)
        if(decodeToken==null){
            res.status(200).json({
                status: "fail",
                message: "unauthorised"
            })
        }else{
           let email= decodeToken["email"]
           let user_id= decodeToken["user_id"]

           req.headers["email"]=email
           req.headers["user_id"]=user_id
           next()
        }
}