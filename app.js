import express from "express"

const app = express()

app.get("/",(req,res)=>{
    res.status(200).json({"message": "WELCOME TO THIS E-COMMERCE WEB API...👻"})
})



export {app}