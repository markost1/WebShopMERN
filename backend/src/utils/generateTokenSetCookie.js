import jwt from 'jsonwebtoken'

export const generateTokenSetCookie = async(res, userId, isAdmin) =>{

    const token = jwt.sign({userId, admin:isAdmin},process.env.JSON_SECRET_KEY,{
        expiresIn:"7d" 
    })

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    })



    return token;
}