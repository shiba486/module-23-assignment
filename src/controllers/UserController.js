import {
  UserOtpService,
  VerifyOTPService,
  saveProfileServices,
  ReadProfileService,
} from "./../services/UserServices.js";



export const UserOtp = async (req, res) => {
  let result = await UserOtpService(req)
  res.status(200).json(result)
};

export const VerifyOTP = async (req, res) => {
  let result = await VerifyOTPService(req)
  if(result["status"]=="success"){
    //cookie option
    let cookieOption={
      expires:new Date(Date.now()+24*6060*1000,),
      httpOnly:false
    }
    //set cookie with response
    res.cookie("token",result["token"],cookieOption)
   return res.status(200).json(result)
  }else{

   return res.status(200).json(result)
  }
};

export const UserLogout = async (req, res) => {
  let cookieOption={
    expires:new Date(Date.now()-24*6060*1000,),
    httpOnly:false
  }
  //remove cookie with response
  res.cookie("token","",cookieOption)
  res.status(200).json({status: "success"})
};



export const CreateProfile = async (req, res) => {
  let result = await saveProfileServices(req)
  res.status(200).json({status: "success",message: "profile create"})
};

export const UpdateProfile = async (req, res) => {
  let result = await saveProfileServices(req)
  res.status(200).json({status: "success",message: "profile updated"})
};

export const ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req)
  res.status(200).json(result)
};
