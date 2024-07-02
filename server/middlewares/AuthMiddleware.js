import User from '../models/UserModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const userVerification = async (req, res) =>{
    const token = req.cookies?.token;
    console.log(token)
    if(!token){
        return res.status(401).json({status:false, message:"No token provided"});
    } 

    jwt.verify(token, JWT_SECRET, async(err, data) =>{
        console.log(data);
        if(data){
            const user = await User.findById(data.user);
            console.log(user);
            if(!user){
                console.log("User doesn't exist")
                return res.status(401).json({status:false, message:"User doesn't exist"});
            } 
            res.status(200).json({status:true, user: user.username})    
        }
        else{
            console.log("Invalid token")
            return res.status(401).json({status:false, message:"Invalid token"});
        }
    })
}