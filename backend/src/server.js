import express from 'express'
import userRouter from './routes/user.route.js'
import categoryRouter from './routes/category.route.js'
import productRouter from './routes/products.route.js'
import cartRouter from './routes/cart.route.js'
import { connectDB } from './config/db.js'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
dotenv.config();


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)


connectDB().then(()=>{  
app.listen(3000, ()=>{
    console.log("Server is running...");
  })  
})



