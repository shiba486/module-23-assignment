import { app } from "./app.js";




const port = process.env.PORT || 3000
const startServer = async ()=>{
    
    app.listen(port,()=>{
        console.log(`server is running successfully at port : ${port}`);
    })
}

startServer()