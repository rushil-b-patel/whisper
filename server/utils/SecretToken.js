import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const JWT_KEY = process.env.JWT_SECRET;

export const createToken = (user) => {
    return jwt.sign({ user }, JWT_KEY, { expiresIn: '10m' });
}