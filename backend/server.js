const express=require('express') 
const jwt=require("jsonwebtoken") 
const cors=require("cors") 
const collection = require('./mongo.js') 
const app=express() 
const path=require('path')

const port=8080
app.use(cors())  
app.use(express.json())   

app.post("/login",async(req,res) => { 
    const {username,password}=req.body 
    try{
        const check=await collection.findOne({username:username})
        const check1=await collection.findOne({password:password}) 
        if(check && check1){
            const jwtToken=jwt.sign({username:username,password:password},"MYSECRETKEY") 
            res.send(jwtToken)
        } 
        else{  
            res.send("Not Exist")
        }
    }
    catch(e){
        res.send("Not Valid")
    }
}) 
 

   
app.post("/register",async(req,res) => {
    const {username,password}=req.body 
    const data={
        username:username,
        password:password
    }
    try{
        const check=await collection.findOne({username:username}) 
        if(check){
            res.send("exist")
        } 
        else{ 
            res.send("Not Exist") 
            await collection.insertMany([data])
        }
    }
    catch(e){
        res.send("Not Valid") 
    }
}) 


app.listen(4000,() => {  
    console.log('Port Listened Successfully') 
})  