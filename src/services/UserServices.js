import { sendEmail } from "../utils/emailSend.js"
import { EncodeToken } from "../utils/tokenHelper.js";
import { UserModel } from './../models/UserModel.js';

import { ProfileModel } from './../models/ProfileModel.js';

export const UserOtpService= async(req)=>{
   try {
     let email = req.params["email"]
     let code = Math.floor(100000+Math.random()*900000)
     let emailText=`Your verification code is: ${code}`
     let emailSubject=`Email Verification`
 
     await sendEmail(email,emailSubject,emailText)
 
     await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})
     return {status: "success",message: "6 digit otp has sent to your mail"}
   } catch (error) {
    return {status: "fail",message: "something went wrong"}
   }
}


export const VerifyOTPService= async(req)=>{
    try {
      let email = req.params["email"]
      let otp = req.params["otp"]
  
      //user count
      let total =await UserModel.find({email: email,otp: otp}).count("total")
      if(total!==1){
          return {status: "fail", message: "invalid Otp"}
      }
      //user read
      let user_id = await UserModel.find({email:email,otp:otp}).select("_id")
      // console.log(user_id)
  
      //token generate
      let token = EncodeToken(email,user_id[0]["_id"].toString())
  
      //otp update to 0
      await UserModel.updateOne({email:email},{$set:{otp:0}})
     
     return {status: "success", message: "valid otp", token: token}
    } catch (error) {
      return {status: "fail", message: "invalid otp"}
    }
}





export const saveProfileServices= async(req)=>{
    try {
      let user_id= req.headers["user_id"]
     
      let reqBody= req.body
  
      let userProfile= await ProfileModel.updateOne({userID: user_id},{$set: reqBody},{upsert: true})
  
      return {status: "success", data: userProfile}
    } catch (error) {
      return {status: "fail", data: userProfile}
    }

}



export const ReadProfileService= async(req)=>{

 try {
   let user_id= req.headers["user_id"]
   let data =await ProfileModel.findOne({userID: user_id})
 
   return {status: "success", data: data}
 
 } catch (error) {
  return {status: "success", data: "something went wrong"}
 }
}

