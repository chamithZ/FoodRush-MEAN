require('dotenv').config()
const express =require('express')


//express app
const app=express()


//routes 
app.get('/',(req,res)=>{
    res.json("hehe")
})

//middleware for check requests
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
//listen for requests 
app.listen(process.env.port,()=>{
    console.log('server is running on port', process.env.port)
})      