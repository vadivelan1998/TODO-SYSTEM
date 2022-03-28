
const connect=require("./configs/db")
const mongoose=require("mongoose")
const app=require("./index")


app.listen(6000,async()=>{
    
    try {
        await connect()
        console.log("listening on port 6000")
    } catch (error) {
        console.log(error)
    }
})