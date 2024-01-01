require('dotenv').config()
const express =require('express')


//express app
const app=express()
const restaurantRoute=require('./routes/restaurant');
const { MongoClient } = require('mongodb');
const uri=process.env.Mongo_URI;
const PORT=process.env.port;
//routes 

app.use('/restaurant',restaurantRoute)

//middleware for check requests
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})



MongoClient.connect(uri)
.then(client=>{
    console.log("connected to database");
    app.listen(PORT,()=>console.log("server is listening port"));

    const db = client.db('foodrush');

    const restaurant=db.collection('foodrush')

    app.use(cors())
    app.use(express.json())

    app.listen(PORT,()=>{
        console.log('server is running on port', PORT)
    })   

})
.catch(error=>{ 
    console.log(error)
})

