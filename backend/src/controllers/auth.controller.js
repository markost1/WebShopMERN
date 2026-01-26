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
        const verifyToken = crypto.randomBytes(32).toString("hex");
        const hashVerifyToken = crypto.createHash("sha256").update(verifyToken).digest("hex");
        const verifyTokenExpire = Date.now() + 10  * 1000; //  1m min    

         
        const newUser = new User({
            name,
            email,
            password:hashPassword,
            emailVerifyToken:hashVerifyToken,
            emailVerifyExpiresAt:verifyTokenExpire,    
        },
    )
        await newUser.save();

         
       
         console.log(`Email verification token (send this to user via email): ${verifyToken}`);
        
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

        if(!findUser.isVerified){
            return  res.status(400).json({message:"Please verify your email to login"});
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


export const resetPassword = async(req,res)=>{
    
    const {newPassword} = req.body
    const {token} = req.params;
    
     if (!newPassword) {
        return res.status(400).json({ success: false, message: "New password is required" });
    }

    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken:hashedToken,
            resetPasswordExpiresAt: { $gt: Date.now() },
        })

        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired reset token"})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;  

        await user.save();

        // send a confirmation email to the user here
        console.log('password is succesfully changed');
        

        res.status(200).json({success:true, message:"Password has been successfully reset",user})


      


    } catch (error) {
        res.status(500).json({success:false, message:"Something went wrong", error:error.message})
    }


}

export const verifyEmail = async (req,res) => {
    const {token} = req.params;
try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        emailVerifyToken:hashedToken,
        emailVerifyExpiresAt: { $gt: Date.now() },
    })
    if(!user){
        return res.status(400).json({success:false, message:"Invalid or expired verification token"})
    }

    user.isVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpiresAt = undefined;

    await user.save();

    res.status(200).json({success:true, message:"Email has been successfully verified",user:{
        ...user._doc,
        password:undefined,
    }})
    
} catch (error) {
    res.status(500).json({success:false, message:"Something went wrong", error:error.message})  
}
}

export const resendVertificationEmail = async(req,res)=>{
    const{email} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(200).json({message:"Verification email sent if user exists"});

        }

        if(user.isVerified){
            return res.status(400).json({message:"Email is already verified"})
        }

        const verifyToken = crypto.randomBytes(32).toString("hex");
        const verifyTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours    
        const hashVerifyToken = crypto.createHash("sha256").update(verifyToken).digest("hex");

        user.emailVerifyToken = hashVerifyToken;
        user.emailVerifyExpiresAt = verifyTokenExpire;

        await user.save();

        console.log(`Email verification token (send this to user via email): ${verifyToken}`);
        
        res.status(200).json({message:"Verification email sent if user exists"});

        
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error:error.message})
    }
}