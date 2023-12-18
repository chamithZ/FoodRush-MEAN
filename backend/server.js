require('dotenv').config()
const express =require('express')


//express app
const app=express()
const restaurantRoute=require('./routes/restaurant')

//routes 

app.use('/restaurant',restaurantRoute)

//middleware for check requests
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
//listen for requests 
app.listen(process.env.port,()=>{
    console.log('server is running on port', process.env.port)
})      