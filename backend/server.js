require('dotenv').config()
const express =require('express')
const cors=require('cors')

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
     

    const db = client.db('foodrush');

    const restaurant=db.collection('restaurant')

    app.use(cors())
    app.use(express.json())

    app.listen(PORT,()=>{
        console.log('server is running on port', PORT)
    })   

    app.post('/addrestaurant',(req,res)=>{

        restaurant.insertOne(req.body)
        .then(result=>{
            res.status(200).json({message:"success"})
        })
    .catch(error=>{
       res.status(500).json({
        sucess:false
       })
    })
})

    app.get('/getrestaurant',(req,res)=>{
        restaurant.find({})
        .toArray()
        .then(results=>{
            res.status(200).json({
                sucess:true,
                data:results
            });
        }).catch(err=>{
            res.status(500),json({
                sucess:false,

            })
        })
    })

    app.put('/updaterestaurant/:id', (req, res) => {
        const restaurantId = req.params.id;
    
        restaurant.findOneAndUpdate(
            { _id: restaurantId },
            {
                $set: req.body,
                
            },
           
        ).then(updatedRestaurant => {
            res.json({
                success: true,
                updatedRestaurant: updatedRestaurant
            });
        }).catch(err => {
            res.status(500).json({
                success: false,
                error: err.message
            });
        });
    });
    

    app.delete('/deleteRestaurant/:id',(req,res)=>{
        restaurant.findOneAndDelete({
            _id: req.params.id
        }).then(result=>{
            res.status(200).json({
                sucess:true,
                message:"deleted"
            })
        }).catch(err=>{
            res.status(500).json({
                sucess:false,
            })
        })

.catch(error=>{ 
    console.log(error)
}) 

    })
})

