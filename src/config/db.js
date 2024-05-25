import mongoose from "mongoose";
import { config } from "./config.js";


const connectDB = async ()=>{
   try {
    
    mongoose.connection.on("connected",()=>{
     console.log(`\n mongodb connected successfully`);
    })
    mongoose.connection.on("error",(err)=>{
     console.log(`error in connecting to db ${err}`);
    })
    
    //online database
   //  await mongoose.connect(config.databaseUrl)
   
   //local database
    await mongoose.connect(config.localdatabaseUrl)


   } catch (error) {
    console.error(`Failed to connect to db ${error}`);
    process.exit(1)
   }
}

export default connectDB