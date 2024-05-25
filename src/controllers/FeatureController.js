import { FeaturesListServices } from "../services/FeatureServices.js"

export const FeaturesList = async(req,res)=>{
    let result = await FeaturesListServices(req)
   
    res.status(200).json(result)
}
