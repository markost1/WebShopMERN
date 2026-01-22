import express from 'express'
import userRouter from './routes/user.route.js'
import { connectDB } from './config/db.js'
import dotenv from "dotenv";
dotenv.config();


const app = express()
app.use(express.json())

app.use('/api/auth',userRouter)


connectDB().then(()=>{  
app.listen(3000, ()=>{
    console.log("Server is running...");
  })  
})



