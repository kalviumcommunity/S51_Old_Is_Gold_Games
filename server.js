const Express = require("express")
require("dotenv").config()

const app = Express()

app.get("/ping" , (req,res)=>{
    res.send("pong")
})

app.get("/" , (req,res)=>{
    res.send("welcome")
})

app.listen(process.env.APP_PORT,()=>{
    console.log("Server started")
})

 