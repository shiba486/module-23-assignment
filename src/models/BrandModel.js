import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        unique: true
    }, 
    brandImg: {
        type: String,
        required: true,
        
    }, 
},{timestamps: true, versionKey: false})

export const BrandModel = mongoose.model("brands", DataSchema)