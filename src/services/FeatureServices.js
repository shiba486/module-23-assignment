
import { LegalModel } from '../models/LegalModel.js';
import { FeatureModel } from './../models/FeaturesModel.js';
export const FeaturesListServices = async(req)=>{
    try {
        let data = await FeatureModel.find()
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", message: "something went wrong"}
    }
}

export const LegalDetailsServices = async(req)=>{
    let type = req.params["types"]
    try {
        let data = await LegalModel.find({type: type})
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", message: "something went wrong"}
    }
}