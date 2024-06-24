import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../utils/SecretToken.js';

export const register = async (req, res, next) => {
    try{
        const {email, password, username} = req.body;
        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json({message:"User already exists"});
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({email, password:hashedPassword, username, createdAt : new Date()});
        const token = createToken(user._id);
        res.cookie('token', token, {withCredentials: true, httpOnly:false});
        res.status(201).json({message:"User created successfully", success:true, user});
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

export const login = async (req, res, next) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({message:"please fill all fiels"});
        const user = await User.findOne({$or:[{email}, {username:email}]});
        if(!user) return res.status(400).json({message:"User doesn't exist"});
        const auth = await bcrypt.compare(password, user.password);
        if(!auth) return res.status(400).json({message:"Invalid Credentials"});
        const token = createToken(user._id);
        res.cookie('token', token, {withCredentials: true, httpOnly:false});
        res.status(201).json({message:"User logged in successfully", success:true, user});
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}