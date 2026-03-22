import {app} from "./app.js"

const port = 3000;


const main = async() =>{
    try {
        app.listen(port,()=>{
            console.log("serever running");
        })
        
    } catch (error) {
        
    }
}

main();