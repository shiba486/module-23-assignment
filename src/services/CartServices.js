import { CartModel } from './../models/CartModel.js';
import mongoose from 'mongoose';
const ObjectID= mongoose.Types.ObjectId

export const SaveListService=async(req)=>{
    try {
        const user_id = req.headers["user_id"]
        const reqBody = req.body
        reqBody.userID= user_id
    
        const data = await CartModel.create(reqBody)
        return {status:"success",message:"Cart List Create Success"}
    } catch (error) {
        console.log(error.message)
        return {status:"fail",message:"Something went wrong"}
    }
}


export const RemoveCartListService=async(req)=>{
    try {
        const user_id = req.headers["user_id"]
        const reqBody = req.body
        reqBody.userID= user_id
    
        const data = await CartModel.deleteOne(reqBody)
        return {status:"success",message:"Cart List delete Success"}
    } catch (error) {
        return {status:"fail",message:"Something went wrong"}
    }
}
export const CartListService=async(req)=>{
    try {
        // let user_id = new ObjectID(req.params['user_id'])
        let user_id = new ObjectID(req.headers['user_id'])
        let MatchStage ={$match:{userID:user_id}}
        let JoinProductStage= {$lookup:{from: "products",localField: "productID",foreignField:"_id",as: "product"}}
        let UnwindProductStage={$unwind: "$product"}

        let JoinBrandStage= {$lookup:{from: "brands",localField: "product.brandID",foreignField:"_id",as: "brand"}}
        let UnwindBrandStage={$unwind: "$brand"}

        let JoinCategoryStage= {$lookup:{from: "categories",localField: "product.categoryID",foreignField:"_id",as: "category"}}
        let UnwindCategoryStage={$unwind: "$category"}

        let projectionStage={
            $project:{
                '_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
                'product.categoryID':0,'product.brandID':0,
                'brand._id':0,'category._id':0
  
            }
        }
        
    
        const data = await CartModel.aggregate([
            MatchStage,
            JoinProductStage,UnwindProductStage,
            JoinBrandStage,UnwindBrandStage,JoinCategoryStage,UnwindCategoryStage,
            projectionStage
        ])
    
        return ({status: "success", data: data})
    } catch (error) {
        return ({status: "fail", message: "Something went wrong"})
    }
}

