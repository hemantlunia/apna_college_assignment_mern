import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next)=>{

    const header = req.headers?.authorization;

    if (!header) {
        return res.status(401).json({message:"Unauthorize"});
    }

    const token = header.split(" ")[1];

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token"})
    }
}