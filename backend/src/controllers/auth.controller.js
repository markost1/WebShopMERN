import bcrypt from "bcryptjs";
import { User } from "../models/UserModel.js";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";

export const register = async (req,res) => {
    
    const {name,email,password} = req.body;
    
    try {
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password:hashPassword
        }
    )
        await newUser.save();

         await generateTokenSetCookie(res,newUser._id)

        res.status(201).json({message:"User is successfully registered"})

        
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error:error.message})
        
    }

}