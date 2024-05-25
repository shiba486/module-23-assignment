
import { BrandModel } from '../models/BrandModel.js';
import { CategoryModel } from './../models/CategoryModel.js';
import { ProductModel } from './../models/ProductModel.js';
import { ProductSliderModel } from './../models/ProductSliderModel.js';
import { ProductDetailModel } from './../models/ProductDetailModel.js';
import { ReviewModel } from './../models/ReviewModel.js';

import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId


 export const BrandListServices = async ()=>{
    try {
        let data = await BrandModel.find()
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }
 }

 export const CategoryListServices = async ()=>{
    try {
        let data = await CategoryModel.find()
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }
 }

 export const SliderListServices = async ()=>{
    try {
        let data = await ProductSliderModel.find()
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }
 }
 


 

 export const ListByBrandServices = async (req)=>{
    try {
        let BrandID= new ObjectId(req.params["BrandID"])
        let MatchStage={$match:{brandID: BrandID}}
        let JoinWithBrandStage = {$lookup:{from: "brands",localField: "brandID",foreignField:"_id", as: "brandCollection"}}
        let JoinWithCategoryStage = {$lookup:{from: "categories",localField: "categoryID",foreignField:"_id", as: "categoryCollection"}}
        let UnwindBrandStage = {$unwind:"$brandCollection"}
        let UnwindCategoryStage = {$unwind:"$categoryCollection"}
        let ProjectStage = {$project:{"brandCollection._id": 0,"categoryCollection._id":0,"categoryID":0,"brandID":0 }}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectStage
        ])
        return {status: "success", data: data}

    } catch (error) {
        return {status: "fail", data: error}.toString()
    }
 }
 
 export const ListByCategoryServices = async (req)=>{
    try {
        let categoryID= new ObjectId(req.params["CategoryID"])
        let MatchStage={$match:{categoryID: categoryID}}
        let JoinWithBrandStage = {$lookup:{from: "brands",localField: "brandID",foreignField:"_id", as: "brandCollection"}}
        let JoinWithCategoryStage = {$lookup:{from: "categories",localField: "categoryID",foreignField:"_id", as: "categoryCollection"}}
        let UnwindBrandStage = {$unwind:"$brandCollection"}
        let UnwindCategoryStage = {$unwind:"$categoryCollection"}
        let ProjectStage = {$project:{"brandCollection._id": 0,"categoryCollection._id":0,"categoryID":0,"brandID":0 }}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectStage
        ])
        return {status: "success", data: data}

    } catch (error) {
        return {status: "fail", data: error}.toString()
    }
 }

 export const ListByRemarkServices = async (req)=>{
    try {
        let remark= req.params["Remark"]
        let MatchStage={$match:{remark: remark}}
        let JoinWithBrandStage = {$lookup:{from: "brands",localField: "brandID",foreignField:"_id", as: "brandCollection"}}
        let JoinWithCategoryStage = {$lookup:{from: "categories",localField: "categoryID",foreignField:"_id", as: "categoryCollection"}}
        let UnwindBrandStage = {$unwind:"$brandCollection"}
        let UnwindCategoryStage = {$unwind:"$categoryCollection"}
        let ProjectStage = {$project:{"brandCollection._id": 0,"categoryCollection._id":0,"categoryID":0,"brandID":0 }}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectStage
        ])
        return {status: "success", data: data}

    } catch (error) {
        return {status: "fail", data: error}.toString()
    }
 }
 





 export const ListBySimillerServices = async (req)=>{
        
        try {

            let CategoryID=new ObjectId(req.params["CategoryID"]) 
            let MatchStage={$match:{categoryID: CategoryID}}
            let limitStage={$limit:20}
            let JoinWithBrandStage={$lookup:{from: "brands",localField:"brandID",foreignField: "_id",as: "brandCollection"}}
            let JoinWithCategoryStage={$lookup:{from: "categories",localField:"categoryID",foreignField: "_id",as: "categoryCollection"}}
            let UnwindBrandStage = {$unwind:"$brandCollection"}
            let UnwindCategoryStage = {$unwind:"$categoryCollection"}
            let ProjectStage = {$project:{"brandCollection._id": 0,"categoryCollection._id":0,"categoryID":0,"brandID":0 }}
    
            let data = await ProductModel.aggregate([
                MatchStage,
                limitStage,
                JoinWithBrandStage,
                JoinWithCategoryStage,
                UnwindBrandStage,UnwindCategoryStage,
                ProjectStage
            ])
            return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}.toString()
}
 }


 export const ListByKeywordServices = async (req)=>{
    try {
        let searchRegex= {"$regex": req.params["Keyword"], "$options": "i"}
        let searchParam=[{title: searchRegex},{shortDes: searchRegex}]
        let searchQuery={$or:searchParam}

        let MatchStage={$match:searchQuery}
        let JoinWithBrandStage = {$lookup:{from: "brands",localField: "brandID",foreignField:"_id", as: "brandCollection"}}
        let JoinWithCategoryStage = {$lookup:{from: "categories",localField: "categoryID",foreignField:"_id", as: "categoryCollection"}}
        let UnwindBrandStage = {$unwind:"$brandCollection"}
        let UnwindCategoryStage = {$unwind:"$categoryCollection"}
        let ProjectStage = {$project:{"brandCollection._id": 0,"categoryCollection._id":0,"categoryID":0,"brandID":0 }}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectStage
        ])
        return {status: "success", data: data}


    } catch (error) {
        return {status: "fail", data: error}.toString()
    }
 }
 
 
 export const ProductDetailsServices = async (req)=>{
    try {
        let productID= new ObjectId(req.params["ProductID"])
        let MatchStage={$match:{_id: productID}}
        let JoinWithBrandStage = {$lookup:{from: "brands",localField: "brandID",foreignField:"_id", as: "brandCollection"}}
        let JoinWithCategoryStage = {$lookup:{from: "categories",localField: "categoryID",foreignField:"_id", as: "categoryCollection"}}
        let JoinWithDetailStage = {$lookup:{from: "productdetails",localField: "_id",foreignField:"productID", as: "ProductDetailsCollection"}}
        let UnwindBrandStage = {$unwind:"$brandCollection"}
        let UnwindCategoryStage = {$unwind:"$categoryCollection"}
        let UnwindDetailsStage = {$unwind:"$ProductDetailsCollection"}
        let ProjectStage = {$project:{"brandCollection._id": 0,"categoryCollection._id":0,"categoryID":0,"brandID":0 }}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailStage,
            UnwindBrandStage,UnwindCategoryStage,UnwindDetailsStage,
            ProjectStage
        ])
        return {status: "success", data: data}

    } catch (error) {
        return {status: "fail", data: error}.toString()
    }
 }
 
 export const ReviewListServices = async (req)=>{
        try {
            let productID=new ObjectId(req.params["ProductID"]) 
            let MatchStage={$match:{productID: productID}}
            let JoinWithProfileStage = {$lookup:{from: "profiles",localField: "userID",foreignField:"userID", as: "Profile"}}
            let UnwindProfileStage = {$unwind:"$Profile"}
            let ProjectStage = {$project:{"Profile.cus_name": 1,"des":1,"rating":1,_id: 0}}
            let data = await ReviewModel.aggregate([
                MatchStage,
                JoinWithProfileStage,
                UnwindProfileStage,
                ProjectStage
            ])
            return {status: "success", data: data}
        } catch (error) {
            return {status: "fail", data: error}.toString()
        }
 }

 export const CreateReviewService = async (req) => {
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        let data=await ReviewModel.create({
             productID:reqBody['productID'],
             userID:user_id,
             des:reqBody['des'],
             rating:reqBody['rating'],
         })
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e.toString()}
    }
}