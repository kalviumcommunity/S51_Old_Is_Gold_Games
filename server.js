const Express = require("express")

const app = Express()

app.get("/ping" , (req,res)=>{
    res.send("pong")
})

app.listen(3000,()=>{
    console.log("listening.....")
})

