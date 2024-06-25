import User from '../models/UserModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const userVerification = async (req, res) =>{
    const token = req.cookies.token;
    console.log(token)
    if(!token){
        return res.status(401).json({status:false, message:"No token provided"});
    } 

    jwt.verify(token, JWT_SECRET, async(err, data) =>{
        console.log(JWT_SECRET)
        console.log(data);
        console.log(err);
        if(data){
            const user = await User.findById(data.user);
            if(!user){
                return res.status(401).json({status:false, message:"User doesn't exist"});
            } 
            res.status(200).json({status:true, user: user.username})    
        }
        else{
            return res.status(401).json({status:false, message:"Invalid token"});
        }
    })
}