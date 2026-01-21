import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from "dotenv";
dotenv.config();


const app = express()


connectDB().then(()=>{  
app.listen(3000, ()=>{
    console.log("Server is running...");
  })  
})



