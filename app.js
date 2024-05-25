import express from "express";
const app = express()


//security libray require
import path from "path"
import { fileURLToPath } from "url";
// configuration
const __filename= fileURLToPath(import.meta.url)
const __dirname= path.dirname(__filename)



import cors from "cors"
import helmet from "helmet"
import hpp from "hpp"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from 'express-rate-limit'


// CORS INITIAL
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods:["get","post","put","delete"],
        
    }
));

// SECURITY IMPLEMENTATION 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(hpp());
app.use(express.json({limit: "18kb"}));
app.use(express.urlencoded({extended: true, limit: "18kb"}));
app.use(cookieParser());

const limiter = rateLimit({windowMs: 15 * 60 * 1000, limit: 100})
app.use(limiter)
app.use(mongoSanitize());

// ROUTES




//home route
app.get("/",(req,res)=>{
    res.json({
        message: "WELCOME TO THIS E-COMMERCE WEB API...👻"
    })
})

app.use(express.static("client/dist"))

// //Add React Front End Routing
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
// })

//home route
app.get("*",(req,res)=>{
    res.status(404).json({
        status: 404,
        message: "PAGE NOT FOUND"
    })
})


export {app}