import bcrypt from "bcryptjs";
import crypto from "crypto";
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


export const forgotPassword = async(req,res)=>{
    const{email} = req.body

try {
    const user = await User.findOne({email})
    if(!user){
        return res.status(200).json({success:true, message:"If user with that email exists, we have sent password reset instructions to that email"})
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetPasswordToken = hashToken;
    user.resetPasswordExpiresAt = resetTokenExpire;

    await user.save();

    //send the resetToken to the user's email address.
    console.log(`Password reset token (send this to user via email): ${resetToken}`);

    res.status(200).json({success:true, 
        message:"If user with that email exists, we have sent password reset instructions to that email",
        user:{
            ...user._doc,
            password:undefined,
            resetPasswordToken:undefined,
        }})  

} catch (error) {
    res.status(500).json({success:false, message:"Something went wrong", error:error.message})
}}