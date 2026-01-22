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

export const login = async (req,res) => {
    const {email,password} =req.body;
    try {
        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(400).json({message:"Wrong Credential"});
        }

        const validPassword = await bcrypt.compare(password, findUser.password)

        if(!validPassword){
            return res.status(400).json({message:"Wrong Credential"});
        }

        await generateTokenSetCookie(res,findUser._id)

        res.status(200).json({
            message:"User is successfully logged in",
            user:{
                ...findUser._doc,
                password:undefined
            }
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error:error.message})
    }

}


export const signout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true
    });

    res.status(200).json({ message: "Logged out" });
};

