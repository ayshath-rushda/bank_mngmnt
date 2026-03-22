import {app} from "./app.js"
import { connectDb } from "./database/db.js";

const port = 3000;


const main = async() =>{
    try {
        await connectDb()
        app.listen(port,()=>{
            console.log("serever running");
        })
        
    } catch (error) {
        
    }
}

main();