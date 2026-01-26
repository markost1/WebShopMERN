import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Access Denied. No token provided."});
    }
    try {
      
        const decoded = jwt.verify(token,process.env.JSON_SECRET_KEY);

        req.user = {
            id:decoded.userId,
            isAdmin:decoded.admin
        }

        
        

        next();

    } catch (error) {
        res.status(400).json({message:"Invalid Token",error:error.message});
    }
}
