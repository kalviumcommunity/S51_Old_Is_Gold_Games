const Express = require("express")
const { startDatabase, stopDatabase, isConnected } = require('./db')
require("dotenv").config()

const app = Express()

app.get("/ping" , (req,res)=>{
    res.send("pong")
})

app.get("/" , (req,res)=>{
    res.send(`welcome and db is ${isConnected() ? 'connected' : 'disconnected'}`)
})

app.listen(process.env.APP_PORT,async () => {
    await startDatabase();

    console.log(`server running on PORT:${process.env.APP_PORT}`);
  })

