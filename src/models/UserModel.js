import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    otp: {
        type: String,
        required: true,
        
    }, 
},{timestamps: true, versionKey: false})

export const UserModel = mongoose.model("users", DataSchema)