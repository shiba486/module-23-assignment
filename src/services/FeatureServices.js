

import { FeatureModel } from './../models/FeaturesModel.js';
export const FeaturesListServices = async(req)=>{
    try {
        let data = await FeatureModel.find()
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", message: "something went wrong"}
    }
}
