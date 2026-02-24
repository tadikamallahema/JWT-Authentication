import express from 'express';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app=express();

app.use(express.json());
app.use(cookieParser());
const port=2005;
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

mongoose.connect('mongodb://localhost:27017/jwt')
.then(()=>{
    console.log("Connected to Database Successfully");
})
.catch((err)=>{
    console.log(err.message);
});
app.use('/api/auth',authRoutes);


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})