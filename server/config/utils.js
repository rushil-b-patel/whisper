import dotenv from 'dotenv'
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URI = process.env.FRONTEND_URI;

export { MONGO_URI, PORT, JWT_SECRET, FRONTEND_URI };