import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/AuthRoute.js';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI; 
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB is  connected successfully"))
.catch((err) => console.error(err));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cookieParser());
app.use('/', authRoute);