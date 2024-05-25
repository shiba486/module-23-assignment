import { FeaturesListServices, LegalDetailsServices } from "../services/FeatureServices.js"

export const FeaturesList = async(req,res)=>{
    let result = await FeaturesListServices(req)
   
    res.status(200).json(result)
}
export const LegalDetails = async(req,res)=>{
    let result = await LegalDetailsServices(req)
    res.status(200).json(result)
}