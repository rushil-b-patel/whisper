import User from '../models/UserModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const userVerification = async (req, res) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({status:false});
    jwt.verify(token, JWT_SECRET, async(err, data) =>{
        if(err) return res.status(401).json({status:false});
        const user = await User.findById(data.id);
        if(!user) return res.status(401).json({status:false});
        res.status(200).json({status:true, user:username})
    })
}